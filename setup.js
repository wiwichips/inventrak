#!/usr/bin/env node

const mysql = require('mysql2/promise');
require('dotenv').config();

const schemas = require('./backend/database/schemas');
const orm = require('./backend/database/orm');

function createDatabase(conn, name) {
  return conn.query(`CREATE DATABASE ${name};`);
}

async function createTable(conn, name, columns, pkey) {
  let str = `create table ${name} (`; 
  for (prop in columns)
    str += `${prop} ${columns[prop]},`;
  str += `PRIMARY KEY (${pkey}));`;
  return conn.query(str);
}

function clearDatabase(conn, name) {
  return conn.query(`DROP DATABASE ${name}`); 
}

// clear database and create a new database and table
async function setupDatabase() {
  const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  };

  // create database and clear it if it already exists
  const conn1 = await mysql.createConnection(options);

  console.log(`\tAttemping to delete the ${schemas.databaseName} database if it exists...`);
  try {
    await clearDatabase(conn1, schemas.databaseName);
  } catch (error) {
    if (error.code === 'ER_DB_DROP_EXISTS')
      console.error('Populating database...');
    else
      console.error(error);
  } 

  console.log(`\tCreating the ${schemas.databaseName} Database...`);
  await createDatabase(conn1, schemas.databaseName);

  await conn1.end();

  // connect to the newly created database and add the tables
  options.database = process.env.DB_NAME;
  const conn2 = await mysql.createConnection(options);

  const tablePromises = [];
  for (index in schemas.tables) {
    let table = schemas.tables[index];
    tablePromises.push(createTable(conn2, table.name, table.columns, table.pkey));
  }

  console.log('\tCreating tables...');
  await Promise.all(tablePromises);


  console.log('Database is set up and ready to use!');

  for (i in process.argv) {
    if (process.argv[i].toLowerCase() === 'populate') {
      console.log('\nPopulating the database with example values!');
      await populateDatabase(conn2);
    } 
  }

  await conn2.end();
}

// populate the item table in the database with sample data
function populateDatabase(conn) {
  const adjectives = [ 'stinky', 'slimey', 'rotten', 'expired' ];
  const nouns = [ 'apple', 'baguette', 'milk', 'chickpeas' ];
  const rows = [];

  for (i in nouns) {
    let j = Math.floor(Math.random() * adjectives.length);
    rows.push({
      title: `${adjectives[j]} ${nouns[i]}`,
      quantity: Math.floor(Math.random() * 1000),
    });
  }

  console.log(rows);
  const queryString = orm.insert(rows, schemas.databaseName, 'item');

  
  console.log(queryString);
  return conn.query(queryString);
}

console.log('Attemping to setup the database!');
setupDatabase().then(() => {
});

