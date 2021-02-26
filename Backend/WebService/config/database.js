const MySql = require('mysql');
const Util = require('util');

const pool = MySql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'schedule_oztral',
	multipleStatements: true
});

pool.query = Util.promisify(pool.query);
module.exports = pool;