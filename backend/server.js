#!/usr/bin/env node

const express = require('express');
const path = require('path');

const inventory = require('./inventory');

const app = express();

// serve html
app.get('/', express.static(path.join(__dirname, '../public')));

app.get('/list', (req, res) => {
  inventory.listItems()
    .then(items => {
      res.send(items);
    })
    .catch(error => {
      res.status(502).send(error.message);
    });
});


// run server process
const server = app.listen(process.env.PORT || 8000, () => {
  const port = server.address().port;
  console.log(`listening at http://localhost:${port}`);
});

