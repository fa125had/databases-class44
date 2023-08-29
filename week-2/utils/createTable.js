// This file is responsible for creating tables in the DB
export const createTable = (connection, tableName, tableSchema) => {
  connection.query(`CREATE TABLE IF NOT EXISTS ${tableName} ${tableSchema}`, (err) => {
    if (err) {
      console.log(`Error creating table: ${tableName}\n${err}`);
      return;
    }
    console.log(`Table created successfully: ${tableName}`);
  });
};
