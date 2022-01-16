const url = 'http://localhost:8000/';

async function updateList() {
  const response = await fetch(`${url}list`);
  const list = await response.json();
  document.getElementById("list").innerHTML = JSON.stringify(list);
}

updateList();


// set values
document.getElementById("list").innerHTML = "My First JavaScript";
