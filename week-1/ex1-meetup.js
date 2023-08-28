/*

✓ Create a database called meetup

✓ Make a connection to your database, using your MySQL hyfuser login credentials

✓ Create a table called Invitee with the following fields (invitee_no, invitee_name and invited_by)

✓ Create a table called Room with the following fields (room_no, room_name and floor_number)

✓ Create a table called Meeting with the following fields (meeting_no, meeting_title, starting_time, ending_time ,room_no)

✓ Insert 5 rows into each table with relevant fields. Find a way to create the data for those fields

✓ Test your code by executing node <FILE_NAME> in the terminal. Then check your MySQL database and see if everything has been created as expected. 

✓ be sure your file can be run more than once. You can drop and create the database every time the file is run.

*/

import mysql from "mysql";

// Server config
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "hyfuser",
  password: "Hyfpassword@44",
});

// server connection
connection.connect((err) => {
  if (err) {
    console.log(`Error Connection: ${err.stack}`);
    return;
  }

  console.log(`Connected to the server successfully!`);

  const dbName = "meetup";

  // delete the db if it's exist
  connection.query(`DROP DATABASE IF EXISTS ${dbName}`, (err) => {
    if (err) {
      console.log(`Error Creating DB: ${err.stack}`);
      return;
    }

    console.log(`Old database deleted successfully: ${dbName}`);
  });

  // create the db
  connection.query(`CREATE DATABASE ${dbName}`, (err) => {
    if (err) {
      console.log(`Error Creating DB: ${err.stack}`);
      return;
    }
    console.log(`new DB Created successfully: ${dbName}`);

    // Use the db
    connection.query(`USE ${dbName}`, (err) => {
      if (err) {
        console.log(`Error using the DB: ${err.stack}`);
        return;
      }
      console.log(`DB in use successfully: ${dbName}`);

      // Tables
      const createTablesQueries = [
        `CREATE TABLE Invitee (
          invitee_no INT AUTO_INCREMENT PRIMARY KEY, 
          invitee_name VARCHAR(30) NOT NULL, 
          invited_by VARCHAR(50)
        )`,
        `CREATE TABLE Room (
          room_no SMALLINT AUTO_INCREMENT PRIMARY KEY,
          room_name VARCHAR(20) NOT NULL, 
          floor_number TINYINT NOT NULL
        )`,
        `CREATE TABLE Meeting (
          meeting_no INT AUTO_INCREMENT PRIMARY KEY,
          meeting_title VARCHAR(30),
          starting_time DATETIME NOT NULL, 
          ending_time DATETIME NOT NULL,
          room_no SMALLINT NOT NULL,
          FOREIGN KEY (room_no) REFERENCES Room(room_no)
        )`,
      ];

      // Create tables
      createTablesQueries.forEach((query) => {
        connection.query(query, (err) => {
          if (err) throw err;
          console.log(`Table created successfully: ${query.split(" ")[2]}`);
        });
      });

      // Insert 5 rows into each table
      const insertQueries = [
        `INSERT INTO Invitee (invitee_name, invited_by) 
          VALUES  ('John', NULL), 
                  ('Jane', 'John'), 
                  ('Sara', 'Jane'), 
                  ('Mary', 'Jane'), 
                  ('Rose', 'Jane')`,

        `INSERT INTO Room (room_name, floor_number) 
          VALUES  ('Conference Room', 1), 
                  ('Meeting Room', 2), 
                  ('Board Room', 3), 
                  ('Training Room', 1), 
                  ('Strategy Room', 2)`,

        `INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) 
          VALUES  ('Team Meeting', '2023-08-23 09:00:00', '2023-08-23 10:00:00', 1), 
                  ('Board Meeting', '2023-08-23 11:00:00', '2023-08-23 13:00:00', 3), 
                  ('Training Session', '2023-08-23 14:00:00', '2023-08-23 16:00:00', 4), 
                  ('Project Discussion', '2023-08-23 17:00:00', '2023-08-23 18:00:00', 2), 
                  ('Strategy Discussion', '2023-08-23 19:00:00', '2023-08-23 20:00:00', 5)`,
      ];

      insertQueries.forEach((query) => {
        connection.query(query, (err) => {
          if (err) throw err;
          console.log(`Data inserted into table: ${query.split(" ")[2]}`);
        });
      });

      connection.end((err) => {
        if (err) throw err;
        console.log(`Disconnected successfully!`);
      });
    });
  });
});
