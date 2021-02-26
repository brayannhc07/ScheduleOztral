'use strict'
// Imports
var app = require('./app');

// Config 
const port = 3700;

app.listen(port, () => {
	console.log(`Servidor ejecutándose en el puerto ${port}.`);
});
