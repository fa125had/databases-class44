/*
✓ Write some queries to retrieve the following rows:
    ✓ All research papers and the number of authors that wrote that paper.
    ✓ Sum of the research papers published by all female authors.
    ✓ Average of the h-index of all authors per university.
    ✓ Sum of the research papers of the authors per university.
    ✓ Minimum and maximum of the h-index of all authors per university.
*/

import { connectToDB, createAndUseDB } from "./utils/db.js";

// DB config
const dbName = "library";

// Server connection config
const connection = connectToDB();

createAndUseDB(connection, dbName, () => {
  // All research papers and the number of authors that wrote that paper
  connection.query(
    `
    SELECT research_papers.title, COUNT(authors_papers.id) AS 'Number of authors'
    FROM research_papers
    LEFT JOIN authors_papers 
      ON research_papers.id = authors_papers.paper_id
    GROUP BY research_papers.id;`,
    (err, results) => {
      if (err) {
        console.log(`Error executing query: ${err}`);
        return;
      }
      console.log("Research papers and number of authors:");
      console.log(results);
    }
  );

  // Sum of the research papers published by all female authors
  connection.query(
    `
    SELECT COUNT(research_papers.id) AS 'Number of papers'
    FROM authors
    JOIN authors_papers
      ON authors.id = authors_papers.author_id
    JOIN research_papers
      ON authors_papers.paper_id = research_papers.id
    WHERE authors.gender = 'female';`,
    (err, results) => {
      if (err) {
        console.log(`Error executing: ${err}`);
        return;
      }
      console.log("Sum of research papers by female authors:");
      console.log(results);
    }
  );

  // Average of the h-index of all authors per university
  connection.query(
    `
    SELECT university, AVG(h_index) AS avg_h_index
    FROM authors
    GROUP BY university;`,
    (err, results) => {
      if (err) {
        console.log(`Error executing: ${err}`);
        return;
      }
      console.log("Average h-index per university:");
      console.log(results);
    }
  );

  // Sum of the research papers of the authors per university
  connection.query(
    `
    SELECT authors.university, COUNT(research_papers.id) AS num_papers
    FROM authors
    JOIN authors_papers
      ON authors.id = authors_papers.author_id
    JOIN research_papers
      ON authors_papers.paper_id = research_papers.id
    GROUP BY authors.university;`,
    (err, results) => {
      if (err) {
        console.log(`Error executing: ${err}`);
        return;
      }
      console.log("Sum of research papers per university:");
      console.log(results);
    }
  );

  // Minimum and maximum of the h-index of all authors per university
  connection.query(
    `
    SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
    FROM authors
    GROUP BY university;`,
    (err, results) => {
      if (err) {
        console.log(`Error executing: ${err}`);
        return;
      }
      console.log("Min and Max h-index per university:");
      console.log(results);
    }
  );

  // Close the connection
  connection.end();
});
