'use strict'
const DB = require('../config/database');
const JWT = require('jsonwebtoken');
const Encrypt = require('../tools/encrypt');
const tableName = "users";

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
		const query = `insert into ${tableName} (login_name, password, first_name, last_name) values('${login_name.trim()}', '${Encrypt.SHA256(password)}', '${first_name.trim()}', '${last_name.trim()}')`;
		try {
			const rows = await DB.query(query);
			console.log(rows);
			if (rows.affectedRows != 1) {
				return res.status(500).send({
					success: false,
					message: "No fue posible registrarte, inténtalo de nuevo más tarde."
				});
			}
			return res.status(200).send({
				success: true,
				message: "Te registraste correctamente."
			});
		} catch (error) {
			let message = error;
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
			return res.status(500).send({
				success: false,
				message: message
			});
		}
	},
	async readList(req, res) {
		// Devuelve la lista de usuarios
		let query = `select * from ${tableName}`;
		const results = await DB.query(query);
		return res.status(200).send({
			success: true,
			data: results
		});
	},
	async updateProfile(req, res) {
		// Permite al usuario cambiar sus datos (no la contraseña)
		const { login_name, password, first_name, last_name } = req.body;
		const { id } = req.params; // obtiene el id de la url
		if (!id || !login_name || !password || !first_name || !last_name) {
			// Si alguno de los campos es nulo, devuelve error
			return res.status(500).send({
				success: false,
				message: "Los datos son incompletos."
			});
		}
		// Primero se verifica que el usuario exista y haya ingresalo su contraseña correctamente
		try {
			let query = `select * from ${tableName} where id = '${id}' and password = '${Encrypt.SHA256(password)}'`;
			let rows = await DB.query(query); // Se hace la consulta 
			if (rows.length != 1) {
				// El usuario no existe (id) o no ingresó la contraseña correcta
				return res.status(500).send({
					success: false,
					message: "Tu usuario no está disponible o no se confirmó tu contraseña."
				});
			}
			// Ahora se hacen los cambios
			query = `update ${tableName} set login_name = '${login_name.trim()}', first_name = '${first_name.trim()}', last_name = '${last_name.trim()}' where id = ${id}`;
			console.log(query);
			rows = await DB.query(query);
			console.log(rows);
			if (rows.affectedRows != 1) {
				return res.status(500).send({
					success: false,
					message: "No fue posible actualizar tu perfil, inténtalo de nuevo más tarde."
				});
			}
			let model = {
				id: id,
				login_name: login_name,
				first_name: first_name,
				last_name: last_name
			}
			return res.status(200).send({
				success: true,
				message: "Tu perfil se actualizó correctamente.",
				data: model
			});
		} catch (error) {
			console.log(error);
			let message = error;
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
			return res.status(500).send({
				success: false,
				message: message
			});
		}
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
		const query = `select * from ${tableName} where login_name = '${login_name.trim()}' and password = '${Encrypt.SHA256(password)}'`;
		try {
			const rows = await DB.query(query);
			if (rows.length != 1) {
				return res.status(500).send({
					success: false,
					message: "Usuario y/o contraseña incorrectos."
				});
			}
			// Se extraen los datos del usuario
			let model = {
				id: rows[0].id,
				login_name: rows[0].login_name,
				first_name: rows[0].first_name,
				last_name: rows[0].last_name,
				token: ''
			}
			// Se genera el token
			const token = JWT.sign({
				id: model.id,
				login_name: model.login_name,
				first_name: model.first_name
			}, "debugkey");
			model.token = token;

			return res.status(200).send({
				success: true,
				message: "Ingresaste correctamente correctamente.",
				data: model
			});
		} catch (error) {
			let message = error;
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
			return res.status(500).send({
				success: false,
				message: message
			});
		}
	}

}

module.exports = controller;