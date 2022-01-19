const url = 'http://localhost:8000/';

async function createItem(title, quantity) {
  const body = { title, quantity };

  console.log(body);

  const response = await fetch(`${url}create`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });
  const result = await response.json();
}

async function editItem(id, prototype) {
  const body = { id, prototype };

  const response = await fetch(`${url}edit`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });
}

async function remove(id) {
  const body = { id };
  const response = await fetch(`${url}delete`, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });
}

async function updateList() {
  const response = await fetch(`${url}list`);
  const list = await response.json();

  document.getElementById("list").innerHTML = JSON.stringify(list, null, '<br>');
}

// event listeners
document.getElementById("create-button").addEventListener("click", () => {
  const title = document.getElementById("create-title").value;
  const quantityStr = document.getElementById("create-quantity").value;
  const quantityInt = quantityStr === '' ? 0 : Number(quantityStr);

  if (title === '')
    throw new Error('Title field is empty');

  createItem(title, quantityInt).then(updateList);
});

document.getElementById("edit-button").addEventListener("click", () => {
  const id = Number(document.getElementById("edit-id").value);
  const title = document.getElementById("edit-title").value;
  const quantity = document.getElementById("edit-quantity").value;
  const prototype = {};

  if (!id)
    throw new Error('ID required to edit an item');

  if (title)
    prototype.title = title;

  if (quantity !== '')
    prototype.quantity = Number(quantity);

  editItem(id, prototype).then(updateList);
});

document.getElementById("delete-button").addEventListener("click", () => {
  const id = Number(document.getElementById("delete-id").value);

  remove(id).then(updateList);
});

updateList();

