'use strict'
const DB = require('../config/database');
const JWT = require('jsonwebtoken');
const Encrypt = require('../tools/encrypt');
const tableUser = "users";
const tableFields = "user_fields";

function handleError(error) {
	// Ayuda a controlar los errores que sucedan 
	console.log(error);
	let message = error.message;
	if (error.errno) {
		// Si es una excepción de sql, se puede controlar con el código
		switch (error.errno) {
			case 1062:
				// Entrada duplicada
				message = 'Ya existe ese nombre de usuario, intenta con uno distinto';
				break;
			case -4078:
				message = "No hay conexión a la base de datos.";
				break;
			default:
				break;
		}
	}
	return message;
}
function getToken(model) {
	// Se genera el token
	const token = JWT.sign({
		id: model.id,
		login_name: model.login_name,
		first_name: model.first_name
	}, "debugkey");
	return token;
}
async function findUserById(id) {
	const query = `select * from ${tableUser} where id = '${id}'`;// busca por id
	const rows = await DB.query(query); // se hace la consulta
	if (rows.length == 1) {
		// Se extraen los datos del usuario
		let model = {
			id: rows[0].id,
			login_name: rows[0].login_name,
			first_name: rows[0].first_name,
			last_name: rows[0].last_name,
			password: rows[0].password
		}
		return model;
	}
	return null;
}
async function findUserToLogin(login_name, password) {
	const query = `select * from ${tableUser} where login_name = '${login_name.trim()}' and password = '${Encrypt.SHA256(password)}'`;
	const rows = await DB.query(query);
	if (rows.length == 1) {
		// Se extraen los datos del usuario
		let model = {
			id: rows[0].id,
			login_name: rows[0].login_name,
			first_name: rows[0].first_name,
			last_name: rows[0].last_name,
			token: ''
		}
		model.token = getToken(model);
		return model;
	}
	return null;
}
async function getUserFields(id_user) {
	// Busca los campos que le pertenezcan al usuario (id_user)
	const query = `select * from ${tableFields} where id_user = '${id_user}'`;
	const rows = await DB.query(query); // se hace la consulta
	return rows;
}

const controller = {
	async register(req, res) {
		// Registrarse como usuario nuevo
		const { login_name, password, first_name, last_name } = req.body;
		if (!login_name || !password || !first_name || !last_name) {
			// Si alguno de los campos es nulo, devuelve error
			return res.status(500).send({
				success: false,
				message: "Los datos son incompletos."
			});
		}
		const query = `insert into ${tableUser} (login_name, password, first_name, last_name) values('${login_name.trim()}', '${Encrypt.SHA256(password)}', '${first_name.trim()}', '${last_name.trim()}')`;
		try {
			const rows = await DB.query(query);
			console.log(rows);
			const id = await DB.query("select LAST_INSERT_ID() as 'id'");
			console.log(id);
			if (rows.affectedRows != 1) {
				return res.status(500).send({
					success: false,
					message: "No fue posible registrarte, inténtalo de nuevo más tarde."
				});
			}
			// Se extraen los datos del usuario
			let model = {
				id: id[0].id,
				login_name: login_name,
				first_name: first_name,
				last_name: last_name,
				fields: await getUserFields(id),
				token: ''
			}
			model.token = getToken(model);
			return res.status(200).send({
				success: true,
				message: "Te registraste correctamente.",
				data: model
			});
		} catch (error) {
			return res.status(500).send({
				success: false,
				message: handleError(error)
			});
		}
	},
	async readList(req, res) {
		// Devuelve la lista de usuarios
		let query = `select * from ${tableUser}`;
		const results = await DB.query(query);
		return res.status(200).send({
			success: true,
			data: results
		});
	},
	async updateProfile(req, res) {
		// Permite al usuario cambiar sus datos (no la contraseña)
		const { login_name, password, first_name, last_name, fields } = req.body;
		const { id } = req.params; // obtiene el id de la url
		if (!id || !login_name || !password || !first_name || !last_name || !fields) {
			// Si alguno de los campos es nulo, devuelve error
			return res.status(500).send({
				success: false,
				message: "Los datos son incompletos."
			});
		}
		DB.getConnection(async (err, connection) => {
			connection.beginTransaction(async (err) => {
				try {
					if (err) {                  //Transaction Error (Rollback and release connection)
						connection.rollback(function () {
							connection.release();
							throw "No se pudo realizar la operación.";
							//Failure
						});
					}
					// Primero se verifica que el usuario exista y haya ingresalo su contraseña correctamente
					const result = await findUserById(id);
					if (result == null) {
						// El usuario no existe (id) 
						throw "Tu usuario no está disponible o no se confirmó tu contraseña.";
					}
					let old_password = result.password; // Se obtiene la contraseña existente
					if (Encrypt.SHA256(password) != old_password) {
						// Verifica que la contraseña sea correcta
						// throw "Tu contraseña actual no es correcta, intenta de nuevo.";
						connection.rollback(function () {
							connection.release();
							//Failure
						});
						return res.status(500).send({
							success: false,
							message: "Tu contraseña no es correcta."
						});
					}
					// Ahora se hacen los cambios
					let query = `update ${tableUser} set login_name = '${login_name.trim()}', first_name = '${first_name.trim()}', last_name = '${last_name.trim()}' where id = ${id}`;
					connection.query(query, async (error, results) => {
						if (error) { //Query Error (Rollback and release connection)
							throw error;
						}
						// Sigue manejar los campos extras
						var exist_fields = await getUserFields(id);
						console.log("Campos existentes.");
						console.log(exist_fields);
						console.log("Campos recibidos.");
						console.log(fields);
						query = '';

						for (const item of fields) {
							if (!item.name || !item.value) {
								// el nombre y valor son obligatorios
								throw "Faltan datos, intenta de nuevo.";
							}
							if (!item.id || !exist_fields.some(e => e.id === item.id)) {
								// Si el id es nulo o su id no existe, es un field nuevo
								console.log("Se crea");
								query += `insert into ${tableFields}(name, value, id_user) values('${item.name}', '${item.value}', ${id});`;
								// connection.query(query, (error, results) => {
								// 	if (error) { //Query Error (Rollback and release connection)
								// 		throw error;
								// 	}
								// });
							}
							else if (item.id && exist_fields.some(e => e.id === item.id)) {
								// El item existe, por lo que se debe actualizar
								console.log("Se actualiza.");
								query += `update ${tableFields} set name = '${item.name}', value = '${item.value}' where id = ${item.id};`;
								// connection.query(query, (error, results) => {
								// 	if (error) { //Query Error (Rollback and release connection)
								// 		throw error;
								// 	}
								// });
							}
							console.log(item);
						}
						for (const item of exist_fields) {
							if (!fields.some(e => e.id === item.id)) {
								console.log("Se va a eliminar");
								// Si una de la lista existente no está en la nueva, se debe eliminar
								query += `delete from ${tableFields} where id = ${item.id};`;
								// connection.query(query, (error, results) => {
								// 	if (error) { //Query Error (Rollback and release connection)
								// 		throw error;
								// 	}
								// });
								console.log(item);
							}

						}
						console.log(query);
						if (query != '') {
							connection.query(query, async (error, results) => {
								if (error) { //Query Error (Rollback and release connection)
									throw error;
								}
								connection.commit(async (err) => {
									if (err) {
										throw err;
									}
									console.log('Transaction Completed Successfully.');
									connection.release();
								});
								// se hace la consulta
								exist_fields = await getUserFields(id);
								console.log("Campos existentes.");
								console.log(exist_fields);
								let model = {
									id: id,
									login_name: login_name,
									first_name: first_name,
									last_name: last_name,
									fields: exist_fields
								}

								return res.status(200).send({
									success: true,
									message: "Tu perfil se actualizó correctamente.",
									data: model
								});
							});
						} else {
							connection.commit(async (err) => {
								if (err) {
									throw err;
								}
								console.log('Transaction Completed Successfully.');
								connection.release();
							});
							// se hace la consulta
							exist_fields = await getUserFields(id);
							console.log("Campos existentes.");
							console.log(exist_fields);
							let model = {
								id: id,
								login_name: login_name,
								first_name: first_name,
								last_name: last_name,
								fields: exist_fields
							}

							return res.status(200).send({
								success: true,
								message: "Tu perfil se actualizó correctamente.",
								data: model
							});
						}

					});
				} catch (error) {
					connection.rollback(function () {
						connection.release();
						//Failure
					});
					return res.status(500).send({
						success: false,
						message: handleError(error)
					});
				}
			});
		});
	},
	async deleteProfile(req, res) {
		// Para eliminar el usuario y todos sus datos
	},
	async login(req, res) {
		const { login_name, password } = req.body;
		if (!login_name || !password) {
			// Si alguno de los campos es nulo, devuelve error
			return res.status(500).send({
				success: false,
				message: "Los datos son incompletos."
			});
		}
		try {
			const result = await findUserToLogin(login_name, password);
			if (result == null) {
				return res.status(500).send({
					success: false,
					message: "Usuario y/o contraseña incorrectos."
				});
			}
			// Se extraen los datos del usuario
			let model = {
				id: result.id,
				login_name: result.login_name,
				first_name: result.first_name,
				last_name: result.last_name,
				fields: await getUserFields(result.id),
				token: result.token
			}

			return res.status(200).send({
				success: true,
				message: "Ingresaste correctamente.",
				data: model
			});
		} catch (error) {
			return res.status(500).send({
				success: false,
				message: handleError(error)
			});
		}
	},
	async changePassword(req, res) {
		const { password, new_password } = req.body;
		const { id } = req.params; // obtiene el id de la url
		if (!password || !new_password || !id) {
			// Si alguno de los campos es nulo, devuelve error
			return res.status(500).send({
				success: false,
				message: "Los datos son incompletos."
			});
		}
		// Busca que el id y la contraseña coincidan
		try {
			const result = await findUserById(id);
			if (result == null) {
				return res.status(500).send({
					success: false,
					message: "Tu usuario no está disponible para cambiar la contraseña."
				});
			}
			// Se extraen los datos del usuario
			let old_password = result.password;
			if (Encrypt.SHA256(password) != old_password) {
				// Verifica que la contraseña sea correcta
				return res.status(500).send({
					success: false,
					message: "Tu contraseña actual no es correcta, intenta de nuevo."
				});
			}
			// Se hace la consulta para actualizar la contaseña
			const query = `update ${tableUser} set password = '${Encrypt.SHA256(new_password)}' where id = ${id}`;
			const rows = await DB.query(query); // se hace la consulta
			if (rows.affectedRows != 1) {
				return res.status(500).send({
					success: false,
					message: "No fue posible cambiar tu contraseña, inténtalo de nuevo más tarde."
				});
			}

			return res.status(200).send({
				success: true,
				message: "Tu contraseña ha sido actualizada."
			});
		} catch (error) {
			return res.status(500).send({
				success: false,
				message: handleError(error)
			});
		}
	}

}

module.exports = controller;