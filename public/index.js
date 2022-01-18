const url = 'http://localhost:8000/';

async function createItem() {
  // hardcoding values
  const body = { title: 'test title' };

  const response = await fetch(`${url}create`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });
  const result = await response.json();
  console.log(result);
}

async function editItem() {
  // hardcoding values
  const proto = {
    title: 'editedName'
  }
  const body = {
    prototype: proto,
    id: 2,
  };

  const response = await fetch(`${url}edit`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });
}

async function remove() {
  // hardcoding values
  const id = 3;
  
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
  let str = '';
  for (property in list) {
    str += `[${property}] ~ ${list[property].title}<br>`;
  }

  document.getElementById("list").innerHTML = JSON.stringify(str);
}

createItem().then(updateList).then(remove).then();

// set values
document.getElementById("list").innerHTML = "My First JavaScript";
