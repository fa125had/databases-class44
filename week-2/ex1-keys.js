/*
✓ Create a table, called authors. 

✓ Give it the following fields: (author_id(Primary Key), author_name, university,date_of_birth, h_index, gender)

✓ Write a query that adds a column called mentor to authors table that references the column author_id. 
  For integrity add a foreign key on this column.

*/

import { connectToDB, createAndUseDB } from "./utils/db.js";
import { createTable } from "./utils/createTable.js";

// Server connection config
const connection = connectToDB();

// DB config
const dbName = "library";
const table = "authors";
const newColumn = "mentor";

// Create and use the db
createAndUseDB(connection, dbName, () => {
  // Create the table
  createTable(
    connection,
    `${table}`,
    `(
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      university VARCHAR(100) NOT NULL,
      date_of_birth DATETIME NOT NULL,
      h_index INT NOT NULL,
      gender VARCHAR(20)
    )`
  );

  // Queries
  // Add the new column
  connection.query(
    `
      ALTER TABLE ${table} 
      ADD COLUMN ${newColumn} INT, 
      ADD CONSTRAINT fk_${newColumn} FOREIGN KEY (${newColumn}) REFERENCES ${table}(id)`,
    (err) => {
      if (err) {
        if (
          err.message ==
          `ER_DUP_FIELDNAME: Duplicate column name '${newColumn}'`
        ) {
          console.log(`Column already exist: ${newColumn}`);
          connection.end();
          return;
        } else {
          console.log(`Error adding new column: ${newColumn}\n${err}`);
          connection.end();
          return;
        }
      }
      console.log(`New column added successfully: ${newColumn}`);
      connection.end();
    }
  );
});
