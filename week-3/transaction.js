const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "hyfUser",
  password: "hyf@Password",
  database: "db",
});

connection.connect();

connection.beginTransaction((err) => {
  if (err) throw err;

  const transferAmount = 1000;
  const fromAccount = 101;
  const toAccount = 102;

  // Update 'from' account
  connection.query(
    "UPDATE account SET balance = balance - ? WHERE account_number = ?",
    [transferAmount, fromAccount],
    (error) => {
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }

      // Update 'to' account
      connection.query(
        "UPDATE account SET balance = balance + ? WHERE account_number = ?",
        [transferAmount, toAccount],
        (error) => {
          if (error) {
            return connection.rollback(() => {
              throw error;
            });
          }

          // Log transfer to account_changes
          const changes = [
            [fromAccount, -transferAmount, new Date(), "Transfer out"],
            [toAccount, transferAmount, new Date(), "Transfer in"],
          ];
          connection.query(
            "INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES ?",
            [changes],
            (error) => {
              if (error) {
                return connection.rollback(() => {
                  throw error;
                });
              }

              // Commit changes
              connection.commit((error) => {
                if (error) {
                  return connection.rollback(() => {
                    throw error;
                  });
                }
                console.log("Transaction complete.");
                connection.end();
              });
            }
          );
        }
      );
    }
  );
});
