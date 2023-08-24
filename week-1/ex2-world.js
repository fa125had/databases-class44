/*

✓ What are the names of countries with population greater than 8 million?
✓ What are the names of countries that have “land” in their names?
✓ What are the names of the cities with population in between 500,000 and 1 million?
✓ What's the name of all the countries on the continent ‘Europe’?
✓ List all the countries in the descending order of their surface areas.
✓ What are the names of all the cities in the Netherlands?
✓ What is the population of Rotterdam?
✓ What's the top 10 countries by Surface Area?
✓ What's the top 10 most populated cities?
✓ What is the population number of the world?

*/

import mysql from "mysql";
import fs from "fs";

// server config
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "hyfuser",
  password: "Hyfpassword@44",
  multipleStatements: true,
});

// server connection
connection.connect((err) => {
  if (err) {
    console.log(`connection error: ${err.stack}`);
  }

  console.log(`connected successfully!`);

  const sqlFile = "world.sql";
  const dbName = "world";

  // read the world.sql
  fs.readFile(sqlFile, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading the ${sqlFile}:`, err.message);
      return;
    }

    // execute the sql file
    connection.query(data, (err, result) => {
      if (err) {
        console.log(`Error run the ${sqlFile}: ${err.stack}`);
        return;
      }

      console.log(`the db created successfully!`);

      // use the db
      connection.query(`USE ${dbName}`, (err) => {
        if (err) {
          console.log(`Error, cant use ${dbName}`, err.stack);
        }
        console.log(`successfully using ${dbName}`);

        // Queries
        //What are the names of countries with population greater than 8 million?
        connection.query(
          `
        SELECT name, population
        FROM country
        WHERE population > 8000000
        ORDER BY population ASC
        `,
          (err, result) => {
            if (err) throw err;

            console.log(
              `What are the names of countries with population greater than 8 million?`,
              result
            );
          }
        );

        //What are the names of countries that have “land” in their names?
        connection.query(
          `
        SELECT name
        FROM country
        WHERE name LIKE '%land%'
        ORDER BY name ASC
        `,
          (err, result) => {
            if (err) throw err;

            console.log(
              `What are the names of countries that have “land” in their names?`,
              result
            );
          }
        );

        //What are the names of the cities with population in between 500,000 and 1 million?
        connection.query(
          `
          SELECT name, population
          FROM city
          WHERE population BETWEEN 500000 AND 1000000
          ORDER BY population ASC
        `,
          (err, result) => {
            if (err) throw err;

            console.log(
              `What are the names of the cities with population in between 500,000 and 1 million?`,
              result
            );
          }
        );

        //What's the name of all the countries on the continent ‘Europe’?
        connection.query(
          `
          SELECT name
          FROM country
          WHERE continent = 'Europe' OR 'europe'
          ORDER BY name ASC
        `,
          (err, result) => {
            if (err) throw err;

            console.log(
              `What's the name of all the countries on the continent Europe?`,
              result
            );
          }
        );

        //List all the countries in the descending order of their surface areas
        connection.query(
          `
          SELECT name, surfaceArea
          FROM country 
          ORDER BY surfaceArea DESC
        `,
          (err, result) => {
            if (err) throw err;

            console.log(
              `List all the countries in the descending order of their surface areas`,
              result
            );
          }
        );

        //What are the names of all the cities in the Netherlands?
        connection.query(
          `
          SELECT name
          FROM city
          WHERE countryCode = 'nld'  
          ORDER BY name ASC
        `,
          (err, result) => {
            if (err) throw err;

            console.log(
              `What are the names of all the cities in the Netherlands?`,
              result
            );
          }
        );

        //What is the population of Rotterdam?
        connection.query(
          `
          SELECT population
          FROM city
          WHERE name = 'rotterdam'
        `,
          (err, result) => {
            if (err) throw err;

            console.log(`What is the population of Rotterdam?`, result);
          }
        );

        //What's the top 10 countries by Surface Area?
        connection.query(
          `
          SELECT name, surfaceArea
          FROM country 
          ORDER BY surfaceArea DESC
          LIMIT 10
        `,
          (err, result) => {
            if (err) throw err;

            console.log(`What's the top 10 countries by Surface Area?`, result);
          }
        );

        //What's the top 10 most populated cities?
        connection.query(
          `
          SELECT name, population
          FROM city
          ORDER BY population DESC
          LIMIT 10
        `,
          (err, result) => {
            if (err) throw err;

            console.log(`What's the top 10 most populated cities?`, result);
          }
        );

        //What is the population number of the world?
        connection.query(
          `
          SELECT SUM(population) AS 'World population'
          FROM country
        `,
          (err, result) => {
            if (err) throw err;

            console.log(`What is the population number of the world?`, result);
          }
        );

        //Disconnecting from the server
        connection.end((err) => {
          if (err) {
            console.log(`Error while disconnecting: ${err.stack}`);
          }
          console.log(`Disconnected Successfully!`);
        });
      });
    });
  });
});
