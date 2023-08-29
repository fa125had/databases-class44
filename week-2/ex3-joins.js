/*
✓ Write a query that prints names of all authors and their corresponding mentors.

✓ Write a query that prints all columns of authors and their published paper_title. If there is an author without any research_Papers, print the information of that author too.
*/

import { connectToDB, createAndUseDB } from "./utils/db.js";

// DB config
const dbName = "library";

// Server connection config
const connection = connectToDB();

createAndUseDB(connection, dbName, () => {
  // Query 1: Print Names of All Authors and Their Corresponding Mentors
  connection.query(
    `
    SELECT a1.author_name AS Author, a2.author_name AS Mentor
    FROM authors a1
    LEFT JOIN authors a2 ON a1.mentor = a2.author_id;`,
    (err, results) => {
      if (err) {
        console.log(`Error executing query 1: ${err}`);
        return;
      }
      console.log("Authors and their Mentors:");
      console.log(results);
    }
  );

  // Query 2: Print All Columns of Authors and Their Published Paper Titles
  connection.query(
    `SELECT a.*, rp.paper_title
    FROM authors a
    LEFT JOIN author_paper_rel apr ON a.author_id = apr.author_id
    LEFT JOIN research_papers rp ON apr.paper_id = rp.paper_id;`,
    (err, results) => {
      if (err) {
        console.log(`Error executing query 2: ${err}`);
        return;
      }
      console.log("Authors and their Research Papers:");
      console.log(results);
    }
  );

  // Close the connection
  connection.end();
});
