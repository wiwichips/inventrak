const db = require('./database/mysqlInterface');
const csv = require('./csv');

exports.createItem = async function createItem (title, groups=[], initialQuantity=0) {
  if (initialQuantity < 0) {
    throw new Error('initialQuantity for item cannot be less than 0');
  }

  const newItem = {
    title,
    quantity: initialQuantity,
  };

  const id = await db.insertItem(newItem); 
 
  return id;
}

exports.editItem = async function editItem(id, edits) { 
  return db.editItem(id, edits);
}

exports.deleteItem = async function deleteItem (id) {
  return db.deleteItem(id);
}

exports.listItems = async function listItems() {
  return db.getItemList(); 
}

exports.generateCSV = async function generateCSV() {
  const items = await db.getItemList();
  return csv.generateCSV(items);  
}
