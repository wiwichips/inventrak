# Inventrak
Inventory Tracker

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
Coming soon...

