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
		let query = `insert into ${tableName} (login_name, password, first_name, last_name) values('${login_name.trim()}', '${Encrypt.SHA256(password)}', '${first_name.trim()}', '${last_name.trim()}')`;
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
	}
}

module.exports = controller;