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
				message = 'Ya existe ese nombre de usuario, intenta con uno distinto.';
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
		const { login_name, password, first_name, last_name, fields } = req.body;
		if (!login_name || !password || !first_name || !last_name || !fields) {
			// Si alguno de los campos es nulo, devuelve error
			return res.status(500).send({
				success: false,
				message: "Los datos son incompletos."
			});
		}
		DB.getConnection(async (err, connection) => {
			connection.beginTransaction(async (err) => {
				try {
					if (err) {
						connection.rollback(function () {
							connection.release();
							//Failure
							return res.status(500).send({
								success: false,
								message: "No se pudo realizar la operación."
							});
						});
					}

					// Ahora se hacen los cambios
					// el id se define como 0, para indicar que es un nuevo usuario
					let query = `call save_user(0, '${login_name}', '${Encrypt.SHA256(password)}', '${first_name}', '${last_name}')`;
					connection.query(query, async (error, results) => {
						if (error) {
							console.log(error);
							return res.status(500).send({
								success: false,
								message: handleError(error)
							});
						}
						let id = results[0][0].id; // guarda el id del usuario que se registró
						// Sigue manejar los campos extras
						query = '';

						for (let item of fields) {
							if (!item.name || !item.value) {
								// el nombre y valor son obligatorios
								return res.status(500).send({
									success: false,
									message: "Faltan datos, intenta de nuevo."
								});
							}
							if (!item.id) {
								// Cuando el id no venga definido, se establece como 0
								item.id = 0;
							}
							query += `call save_user_field(${item.id}, '${item.name}', '${item.value}', ${id});`;
						}
						if (query != '') {
							connection.query(query, async (error, results) => {
								if (error) {
									throw error;
								}
								connection.commit(async (err) => {
									if (err) {
										throw err;
									}
									connection.release();
								});
								// se hace la consulta
								let exist_fields = await getUserFields(id);
								let model = {
									id: id,
									login_name: login_name,
									first_name: first_name,
									last_name: last_name,
									fields: exist_fields
								}
								model.token = getToken(model);

								return res.status(200).send({
									success: true,
									message: "Te registraste correctamente.",
									data: model
								});
							});
						} else {
							connection.commit(async (err) => {
								if (err) {
									throw err;
								}
								connection.release();
							});
							// se hace la consulta
							let exist_fields = await getUserFields(id);
							let model = {
								id: id,
								login_name: login_name,
								first_name: first_name,
								last_name: last_name,
								fields: exist_fields
							}
							model.token = getToken(model);

							return res.status(200).send({
								success: true,
								message: "Te registraste correctamente.",
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
					if (err) {
						connection.rollback(function () {
							connection.release();
							return res.status(500).send({
								success: false,
								message: "No se pudo realizar la operación."
							});
							//Failure
						});
					}
					// Primero se verifica que el usuario exista y haya ingresado su contraseña correctamente
					const result = await findUserById(id);
					if (result == null) {
						// El usuario no existe (id) 
						// Verifica que la contraseña sea correcta
						connection.rollback(function () {
							connection.release();
							//Failure
						});
						return res.status(500).send({
							success: false,
							message: "Tu usuario no está disponible."
						});
					}
					let old_password = result.password; // Se obtiene la contraseña existente
					if (Encrypt.SHA256(password) != old_password) {
						// Verifica que la contraseña sea correcta
						connection.rollback(function () {
							connection.release();
							//Failure
						});
						return res.status(500).send({
							success: false,
							message: "Tu contraseña no es correcta, intenta de nuevo."
						});
					}
					// Ahora se hacen los cambios
					// Aquí el password no se manda porque al actualizar, la contraseña no se modifica
					let query = `call save_user(${id}, '${login_name}', '', '${first_name}', '${last_name}')`;
					connection.query(query, async (error, results) => {
						if (error) { //Query Error (Rollback and release connection)
							console.log(error);
							return res.status(500).send({
								success: false,
								message: handleError(error)
							});
						}
						// Sigue manejar los campos extras
						var exist_fields = results[1]; // Obtiene los campos existentes del usuario
						query = '';

						for (let item of fields) {
							if (!item.name || !item.value) {
								// el nombre y valor son obligatorios
								return res.status(500).send({
									success: false,
									message: "Faltan datos, intenta de nuevo."
								});
							}
							if (!item.id) {
								// Cuando el id no venga definido, se establece como 0
								item.id = 0;
							}
							query += `call save_user_field(${item.id}, '${item.name}', '${item.value}', ${id});`;
						}
						for (const item of exist_fields) {
							if (!fields.some(e => e.id === item.id)) {
								// Si una de la lista existente no está en la nueva, se debe eliminar
								query += `delete from ${tableFields} where id = ${item.id};`;
							}

						}
						if (query != '') {
							connection.query(query, async (error, results) => {
								if (error) { //Query Error (Rollback and release connection)
									console.log(error);
									return res.status(500).send({
										success: false,
										message: handleError(error)
									});
								}
								connection.commit(async (err) => {
									if (err) {
										throw err;
									}
									connection.release();
								});
								// se hace la consulta
								exist_fields = await getUserFields(id);
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
								connection.release();
							});
							// se hace la consulta
							exist_fields = await getUserFields(id);
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