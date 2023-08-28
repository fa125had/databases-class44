import { checkSqlServer, serverConnection } from "./configs/server-config.js";

// check sql server
await checkSqlServer();
const connection = await serverConnection();

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
});
