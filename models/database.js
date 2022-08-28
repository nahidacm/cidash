import { MongoClient } from "mongodb";

// Connection URL
const url =
  "mongodb://root:example@localhost:27017/";
const client = new MongoClient(url);

// Database Name
const dbName = "cidash";

export default async function database() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const database = client.db(dbName);

  return database;
}
