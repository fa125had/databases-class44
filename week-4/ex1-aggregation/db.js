import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export const connectDb = async (
  query = {},
  dbName = "databaseWeek4",
  collectionName = "mongo_practices"
) => {
  //  Start connecting
  const uri = process.env.DB_CONN_STRING;
  const client = new MongoClient(uri);
  await client.connect();
  // Use the DB, Select the collection
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  // Query's results
  const result = [];
  // Query
  try {
    const cursor = await collection.find(query);

    for await (const doc of cursor) {
     result.push(doc);
    }

  } catch (error) {
    console.log(error);
  }

  // Close connection
  client.close();

  return result;
};
