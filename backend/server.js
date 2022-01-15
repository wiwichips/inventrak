#!/usr/bin/env node

const express = require('express');
const path = require('path');

const inventory = require('./inventory');

const app = express();

// serve html
app.get('/', express.static(path.join(__dirname, '../public')));

app.post('/create', (req, res) => {
  // temporary hardcoded title for testing
  const title = 'test';

  inventory.createItem(title)
    .then(id => {
      res.send({id});
    })
    .catch(error => {
      res.status(400).send(error.message);
    });
});

app.post('/edit', (req, res) => {
  // temporary hardcoded for testing
  const id = 0;
  const edits = {
    title: 'newAwesomeTitle'
  };

  inventory.editItem(id, edits)
    .then(() => res.send())
    .catch(error => {
      res.status(400).send(error.message); 
    });
});

app.delete('/delete', (req, res) => {
  // temporary id for testing
  const id = 2;

  inventory.deleteItem(id)
    .then(() => res.send())
    .catch(error => {
      res.status(404).send(error.message);
    });
});

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

