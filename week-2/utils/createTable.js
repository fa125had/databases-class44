// This file is responsible for creating tables in the DB
export const createTable = (connection, tableName, tableSchema) => {
  connection.query(`DROP TABLE IF EXISTS ${tableName}`, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
      return;
    }

    connection.query(`CREATE TABLE ${tableName} ${tableSchema}`, (err) => {
      if (err) {
        console.log(`Error creating table: ${tableName}\n${err}`);
        return;
      }
      console.log(`Table created successfully: ${tableName}`);
    });
  });
};
