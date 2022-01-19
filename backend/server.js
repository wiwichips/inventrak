#!/usr/bin/env node

const express = require('express');
const path = require('path');

const inventory = require('./inventory');

const app = express();

// middleware for POST body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve html
app.get('/', express.static(path.join(__dirname, '../public')));
app.get('/index.js', express.static(path.join(__dirname, '../public')));

app.post('/create', (req, res) => {
  const { title, quantity } = req.body;

  inventory.createItem(title, [], quantity)
    .then(id => {
      res.send({id});
    })
    .catch(error => {
      console.error(error);
      res.status(400).send(error.message);
    });
});

app.post('/edit', (req, res) => {
  const { id, prototype } = req.body;

  inventory.editItem(id, prototype)
    .then(() => res.send())
    .catch(error => {
      console.error(error);
      res.status(400).send(error.message); 
    });
});

app.delete('/delete', (req, res) => {
  const { id } = req.body;
  inventory.deleteItem(id)
    .then(() => res.send())
    .catch(error => {
      console.error(error);
      res.status(404).send(error.message);
    });
});

app.get('/list', (req, res) => {
  inventory.listItems()
    .then(items => {
      res.send(items);
    })
    .catch(error => {
      console.error(error);
      res.status(502).send(error.message);
    });
});

// run server process
const server = app.listen(process.env.PORT || 8000, () => {
  const port = server.address().port;
  console.log(`listening at http://localhost:${port}`);
});

