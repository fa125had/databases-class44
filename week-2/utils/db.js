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
  connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err) => {
    if (err) {
      console.log(`Error creating DB: ${err.stack}`);
      return;
    }
    console.log(`DataBase is Ready to use: ${dbName}`);

    connection.query(`USE ${dbName}`, (err) => {
      if (err) {
        console.log(`Error using the DB: ${err.stack}`);
        return;
      }
      console.log(`Switched to the DB successfully: ${dbName}`);
      callback();
    });
  });
};
