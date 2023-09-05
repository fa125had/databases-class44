const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "hyfUser",
  password: "hyf@Password",
  database: "db",
});

connection.connect();

const createAccountTable = `CREATE TABLE account (
  account_number INT PRIMARY KEY,
  balance FLOAT
);`;

const createAccountChangesTable = `CREATE TABLE account_changes (
  change_number INT AUTO_INCREMENT PRIMARY KEY,
  account_number INT,
  amount FLOAT,
  changed_date DATETIME,
  remark TEXT,
  FOREIGN KEY (account_number) REFERENCES account(account_number)
);`;

connection.query(createAccountTable, (error) => {
  if (error) throw error;
  console.log("Account table created.");
});

connection.query(createAccountChangesTable, (error) => {
  if (error) throw error;
  console.log("Account Changes table created.");
});

connection.end();
