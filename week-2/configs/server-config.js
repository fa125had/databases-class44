import { exec } from "child_process";
import readLineSync from "readline-sync";
import mysql from "mysql";
import { dbCredentials } from "./keys.js";

// exec async queries
const executerAsync = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
};

// Check if MySQL is already installed
const isSqlInstalled = async () => {
  try {
    const stdout = await executerAsync("mysql --version");
    console.log(`MySQL is already installed: ${stdout}`);

    return true;
  } catch (err) {
    console.log("MySQL is not installed. Proceeding with installation...", err);

    return false;
  }
};

// Check if root password is already set
const hasSqlPassword = async () => {
  try {
    await executerAsync(`mysql -u root -e SELECT 1`);

    return false;
  } catch (error) {
    console.log(`Root password needed!`);

    return true;
  }
};

// Install MySQL
const installSqlServer = async () => {
  try {
    await executerAsync("brew install mysql");
  } catch (err) {
    console.log(`Error while installing MySQL. ${err}`);
  }
};

// Create user
const createUser = async (rootPassword) => {
  const auth = rootPassword ? `-u root -p${rootPassword}` : "-u root";

  // create the user
  try {
    await executerAsync(
      `mysql ${auth} -e "CREATE USER IF NOT EXISTS '${dbCredentials.username}'@'localhost' IDENTIFIED WITH 'mysql_native_password' '${dbCredentials.password}';"`
    );
    console.log("User created successfully.");

    await executerAsync(
      `mysql ${auth} -e "GRANT ALL PRIVILEGES ON *.* TO '${username}'@'localhost';"`
    );
    console.log("Privileges granted successfully.");

    await executerAsync(`mysql ${auth} -e "FLUSH PRIVILEGES;"`);
    console.log("Privileges flushed successfully.");
  } catch (err) {
    console.log(`Error while creating the user: ${err}`);
  }
};

// Check server installation and root password
export const checkSqlServer = async () => {
  try {
    const isInstalled = await isSqlInstalled();

    if (isInstalled) {
      const isProtected = await hasSqlPassword();

      // check if root password is set or not
      if (isProtected) {
        // read password from user input
        const rootPass = readLineSync.question(
          `Please enter SQL root password:`,
          {
            hideEchoBack: true,
          }
        );

        createUser(rootPass);
      } else if (!isProtected) {
        // when password not set for root(fresh install with brew)
        createUser();
      }
    } else {
      await installSqlServer();
      await checkSqlServer();
    }
  } catch (err) {
    console.log(err);
  }
};

// Login to MySQL server
export const serverConnection = async () => {
  const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: dbCredentials.username,
    password: dbCredentials.password,
  });

  return connection;
};
