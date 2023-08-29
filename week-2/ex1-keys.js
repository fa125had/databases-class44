/*
✓ Create a table, called authors. 

✓ Give it the following fields: (author_id(Primary Key), author_name, university,date_of_birth, h_index, gender)

✓ Write a query that adds a column called mentor to authors table that references the column author_id. 
  For integrity add a foreign key on this column.

*/

import { connectToDB, createAndUseDB } from "./utils/db.js";
import { createTable } from "./utils/createTable.js";

// Server config
const connection = connectToDB();
const dbName = "library";

// Create and use the db
createAndUseDB(connection, dbName, () => {
  // Create authors table
  createTable(
    connection,
    "authors",
    `(
      author_id INT AUTO_INCREMENT PRIMARY KEY,
      author_name VARCHAR(100) NOT NULL,
      university VARCHAR(100) NOT NULL,
      date_of_birth DATETIME NOT NULL,
      h_index INT NOT NULL,
      gender VARCHAR(20)
    )`
  );

  // Queries
  // Execute with 1sec delay
  setTimeout(() => {
    // Add the new column
    connection.query(
      `
      ALTER TABLE authors
      ADD COLUMN mentor INT,
      ADD CONSTRAINT fk_mentor
      FOREIGN KEY (mentor) REFERENCES authors(author_id)
      `,
      (err) => {
        if (err) {
          console.log(`Error adding new column: mentor\n${err}`);
          return;
        }
        console.log(`New column added successfully: mentor`);
        connection.end();
      }
    );
  }, 1000);
});
