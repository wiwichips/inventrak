
// placeholder in-memory inventory
const inventory = {
  lastId: -1,
  items: {}
};

exports.createItem = async function createItem (title, groups=[], initialQuantity=0) {
  if (initialQuantity < 0) {
    throw new Error('initialQuantity for item cannot be less than 0');
  }

  const newItem = {
    title,
    groups,
    quantity: initialQuantity,
  };
  const id = ++inventory.lastId;

  inventory.items[id] = newItem;
  
  return id;
}

exports.editItem = async function editItem(id, edits) { 
  for (property in edits) {
    if (!(property in inventory.items[id]))
      throw new Error(`${property} is not a property of an item`);
    inventory.items[id][property] = edits[property];
  }
}

exports.deleteItem = async function deleteItem (id) {
  if (inventory.items[id])
    delete inventory.items[id];
  else
    throw new Error(`${id} is an invalid ID`);
}

exports.listItems = async function listItems() {
  return inventory.items;
}

