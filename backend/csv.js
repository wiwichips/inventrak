exports.generateCSV = function generateCSV(items) {
  let csvFile = `id, title, quantity\n`;

  for (i in items) {
    let item = items[i];
    csvFile += `${item['id']}, "${item['title']}", ${item['quantity']}\n`
  }

  return csvFile;
}

