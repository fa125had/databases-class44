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
    SELECT rp.paper_title, COUNT(apr.author_id) AS num_authors
    FROM research_papers rp
    LEFT JOIN author_paper_rel apr ON rp.paper_id = apr.paper_id
    GROUP BY rp.paper_id;`,
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
    SELECT COUNT(rp.paper_id) AS num_papers
    FROM authors a
    JOIN author_paper_rel apr ON a.author_id = apr.author_id
    JOIN research_papers rp ON apr.paper_id = rp.paper_id
    WHERE a.gender = 'female';`,
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
    SELECT a.university, COUNT(rp.paper_id) AS num_papers
    FROM authors a
    JOIN author_paper_rel apr ON a.author_id = apr.author_id
    JOIN research_papers rp ON apr.paper_id = rp.paper_id
    GROUP BY a.university;`,
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
