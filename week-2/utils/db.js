// This file is responsible for create connection to DB server
import mysql from "mysql";

export const connectToDB = () => {
  const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "hyfuser",
    password: "Hyfpassword@44",
  });

  connection.connect((err) => {
    if (err) {
      console.log(`Error Connection: ${err.stack}`);
      return;
    }
    console.log(`Connected to the server successfully!`);
  });

  return connection;
};

export const createAndUseDB = (connection, dbName, callback) => {
  connection.query(`DROP DATABASE IF EXISTS ${dbName}`, (err) => {
    if (err) {
      console.log(`Error dropping DB: ${err.stack}`);
      return;
    }
    console.log(`Old database deleted successfully: ${dbName}`);

    connection.query(`CREATE DATABASE ${dbName}`, (err) => {
      if (err) {
        console.log(`Error creating DB: ${err.stack}`);
        return;
      }
      console.log(`New DB created successfully: ${dbName}`);

      connection.query(`USE ${dbName}`, (err) => {
        if (err) {
          console.log(`Error using the DB: ${err.stack}`);
          return;
        }
        console.log(`DB in use successfully: ${dbName}`);
        callback();
      });
    });
  });
};
