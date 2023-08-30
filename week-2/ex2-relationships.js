/*
✓ Create another table, called research_Papers with the following fields: (paper_id, paper_title, conference, publish_date, ...)

✓ What is the relationship between Authors and Research papers? 
    - A paper can have multiple Authors and an Author can have multiple papers. many <=> many

✓ Make necessary changes to authors and research_Papers tables and add more tables if necessary.

✓ Read exercises 3 and 4 and then add information (insert rows) of 15 authors and 30 research papers such that all queries in the exercises 3 and 4 will return some answers

*/

import moment from "moment/moment.js";
import { connectToDB, createAndUseDB } from "./utils/db.js";
import { createTable } from "./utils/createTable.js";

// Server connection config
const connection = connectToDB();

// DB config
const dbName = "library";
const table = "research_papers";

// Create and use the db
createAndUseDB(connection, dbName, () => {
  // Create the table
  createTable(
    connection,
    `${table}`,
    `(
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      conference VARCHAR(100) NOT NULL,
      publish_date DATETIME NOT NULL
    )`
  );

  // Create junction table for authors and papers to handle many<==>many connection
  createTable(
    connection,
    "authors_papers",
    `(
      id INT AUTO_INCREMENT PRIMARY KEY,
      author_id INT,
      paper_id INT,
      FOREIGN KEY (author_id) REFERENCES authors(id),
      FOREIGN KEY (paper_id) REFERENCES research_papers(id)
    )`
  );

  // Insert data
  // 15 authors
  for (let i = 0; i < 15; i++) {
    const date = moment().format("YYYY-MM-DD HH:mm:ss");

    connection.query(
      `
      INSERT INTO authors (name, university, date_of_birth, h_index, gender) 
      VALUES ('Author${i}', 'University${i}', '${date}', '${i}', NULL)`,
      (err) => {
        if (err) console.log(err);
      }
    );
  }

  // 30 research papers
  for (let i = 0; i < 30; i++) {
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    connection.query(
      `
      INSERT INTO research_papers (title, conference, publish_date) 
      VALUES ('Paper${i}', 'Conference${i}', '${date}')`,
      (err) => {
        if (err) console.log(err);
      }
    );
  }

  // Last query to close the connection async
  connection.query(`SELECT 1`, (err) => {
    if (err) console.log(err);
    console.log(`15 Authors added to authors table successfully.`);
    console.log(`30 papers added research_paper table successfully.`);

    connection.end();
  });
});
