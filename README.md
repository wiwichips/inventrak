# Inventrak
Inventory Tracker

This app is used to store information about items such as their title and quantity in inventory.

# Setup
This requires npm, nodejs and mysql to be installed. This setup has only been tested on Ubuntu 20.04 and MacOS.

## MySql installation instructions for Ubuntu 20.04
Install the server daemon.
`sudo apt install mysql-server`

## Create a user, set a password, and grant privileges to that user
`CREATE USER 'inventrak'@'localhost' IDENTIFIED BY 'password';`
`grant all privileges on *.* to 'inventrak'@'localhost';`

## Add secrets to the dotenv file
Please put the password you set in the `.env` file of this project.

## Install dependencies
Run `npm install`

## Run the setup script (only need to run this once)
`node setup.js`

## You now have a working setup
`npm run server`

# Documentation

This repo is spit into a few pieces

## public

The client facing code that runs in the browser.

## backend

The server code used to run the backend.

server.js
- Entry point for the server code.
- Where the express route source code is located.

inventory.js
- Abstracted view for the inventory items.

csv.js
- Parser from a js object to csv format

### database

mysqlInterface.js
- API between the server code and the database code.

orm.js
- Object relational mapping from the server data structures to SQL.
- Generates SQL statements.

schemas.js
- Schema information about the database.

## tests

Simple tests using the `peter` testing framework.

Run the tests using the `npm run test` command.

## setup.js

Standalone file that sets up the database used for this project.

Run with the "populate" flag to populate the database with test values. Usage: `./script.js populate`.

# Future Plans

- Allow multiple files to be edited at once in one request. This would be done with one database pool connection.
- Add pagination to the list endpoint allowing for a subset of the data to be sent at a time. This would be helpful for performance on the frontend and backend.
- Add a cache for the most commonly requested items in inventory.
- Add more fields for inventory items such as description and price.
- Precent SQL injections by sanitizing data.
