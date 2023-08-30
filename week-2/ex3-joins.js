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
  // Print Names of All Authors and Their Corresponding Mentors
  connection.query(
    `
    SELECT authors.name AS 'Author Name', authors.mentor AS 'Mentor ID'
    FROM authors
    JOIN authors AS mentors
      ON authors.mentor = mentors.id;`,
    (err, results) => {
      if (err) {
        console.log(`Error executing: ${err}`);
        return;
      }
      console.log("Authors and their Mentors:");
      console.log(results);
    }
  );

  // Print All Columns of Authors and Their Published Paper Titles
  connection.query(
    `
    SELECT authors.name AS 'Author Name', research_papers.title AS 'Research Title'
    FROM authors
    LEFT JOIN authors_papers
      ON authors.id = authors_papers.author_id
    LEFT JOIN research_papers
      ON authors_papers.paper_id = research_papers.id;`,
    (err, results) => {
      if (err) {
        console.log(`Error executing: ${err}`);
        return;
      }
      console.log("Authors and their Research Papers:");
      console.log(results);
    }
  );

  // Close the connection
  connection.end();
});
