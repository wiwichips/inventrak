#!/usr/bin/env node
const mysql = require('mysql2/promise');
require('dotenv').config();

const schemas = require('./backend/database/schemas');

function createDatabase(conn, name) {
  return conn.query(`CREATE DATABASE ${name};`);
}

async function createTable(conn, name, columns, pkey) {
  let str = `create table ${name} (`; 
  for (prop in columns)
    str += `${prop} ${columns[prop]},`;
  str += `PRIMARY KEY (${pkey}));`;
  console.log(str);
  return conn.query(str);
}

function clearDatabase(conn, name) {
  return conn.query(`DROP DATABASE ${name}`); 
}

async function main() {
  const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  };

  const conn1 = await mysql.createConnection(options);

  // attempt to clear all databases
  try {
    await clearDatabase(conn1, schemas.databaseName);
  } catch (error) {
    if (error.code === 'ER_DB_DROP_EXISTS')
      console.error('Populating database...');
    else
      console.error(error);
  } 

  await createDatabase(conn1, schemas.databaseName);

  await conn1.end();

  options.database = process.env.DB_NAME;

  const conn2 = await mysql.createConnection(options);

  const tablePromises = [];
  for (index in schemas.tables) {
    let table = schemas.tables[index];
    tablePromises.push(createTable(conn2, table.name, table.columns, table.pkey));
  }
  await Promise.all(tablePromises);

  await conn2.end();
}

main();

