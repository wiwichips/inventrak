exports.databaseName = process.env.DB_NAME;

debugger;

exports.tables = [{
    name: 'item',
    columns: {
      id: 'bigint auto_increment',
      title: 'varchar(255)',
      quantity: 'bigint',
    },
    pkey: 'id',
  }
];

