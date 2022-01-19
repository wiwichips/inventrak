
/**
 * This expects an array of objects that represent a row in the table.
 * Each object should be identical in shape. 
 * You can also pass a single object by itself.
 * Returns a sanitized query string that can be queried in sql
 */
exports.insert = function insert(rows, dbName, tableName) {
  if (!Array.isArray(rows))
    rows = [ rows ];

  const shape = Object.keys(rows[0]);

  let sqlString = `INSERT INTO ${dbName}.${tableName} (`;

  for (i in shape) {
    sqlString += `${shape[i]}, `;
  }
  
  sqlString = sqlString.substring(0, sqlString.length - 2);
  sqlString += ') VALUES ';

  for (i in rows) {
    sqlString += '(';
    for (column in rows[i]) {
      let padding = '';
      if (typeof rows[i][column] === 'string')
        padding = '"'; 
      sqlString += `${padding}${rows[i][column]}${padding},`;
    }
    sqlString = sqlString.substring(0, sqlString.length - 1);
    sqlString += '), ';
  }
  
  sqlString = sqlString.substring(0, sqlString.length - 2);
  sqlString += ';';

  return sqlString;
}

