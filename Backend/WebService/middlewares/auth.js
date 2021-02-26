const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(token, "debugkey");
		req.user = decoded;
		next();
	}
	catch (error) {
		console.log(error);
		return res.status(401).send({ success: false, message: "No tienes permito para realizar esta operación." });
	}
}

