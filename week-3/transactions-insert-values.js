const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "hyfUser",
  password: "hyf@Password",
  database: "db",
});

connection.connect();

const insertAccounts =
  "INSERT INTO account (account_number, balance) VALUES (101, 5000), (102, 3000)";
const insertAccountChanges =
  "INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (101, -500, NOW(), 'withdraw'), (102, 200, NOW(), 'deposit')";

connection.query(insertAccounts, (error) => {
  if (error) throw error;
  console.log("Accounts data inserted.");
});

connection.query(insertAccountChanges, (error) => {
  if (error) throw error;
  console.log("Account changes data inserted.");
});

connection.end();
