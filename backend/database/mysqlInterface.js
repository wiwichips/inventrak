const mysql = require('mysql2/promise');

const schemas = require('./schemas');
const orm = require('./orm');

const dbName = schemas.databaseName;
const tableName = schemas.tables[0].name;

function openDBPool() {
  const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };
 
  return mysql.createPool(options);
}

exports.insertItem = async function insert(prototype) {
  const queryString = orm.insert(prototype, dbName, tableName);
  
  const pool = await openDBPool();
  await pool.query(queryString);

  // TODO Potential Race condition
  // if an insert is made between the last query and this query
  const rowsResult = await pool.query('SELECT LAST_INSERT_ID()');
  pool.end();

  const id = rowsResult[0][0]['LAST_INSERT_ID()'];
  return id;
}

exports.getItemList = async function select(num) {
  const queryString = `SELECT * FROM ${dbName}.${tableName}`;
  
  const pool = await openDBPool();
  const rowsResult = await pool.query(queryString);
  pool.end();

  const items = rowsResult[0];
  return items;
} 

exports.deleteItem = async function remove (id) {
  const queryString = `DELETE FROM ${dbName}.${tableName} WHERE id=${id};`;

  const pool = await openDBPool();
  const rowsResult = await pool.query(queryString);
  pool.end();
}

// TODO: allow for multiple IDs and prototypes to be passed and edited in parallel
exports.editItem = async function edit (id, prototype) {
  const queryString = orm.edit(id, prototype, dbName, tableName);

  const pool = await openDBPool();
  const rowsResult = await pool.query(queryString);
  pool.end();
}

