import { MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;

let cachedClient = null;
let cachedDb = null;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!dbName) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

// const MongoClient = require("mongodb").MongoClient;
// let cachedDb = null;

// export const connectToDatabase = async () => {
//   if (cachedDb) {
//     console.log("Using existing DB connection");
//     return Promise.resolve(cachedDb);
//   }

//   return MongoClient.connect(process.env.MONGODB_URI, {
//     native_parser: true,
//     useUnifiedTopology: true,
//   })
//     .then((client) => {
//       let db = client.db("truskin-storage");
//       console.log("New DB Connection");
//       cachedDb = db;
//       return cachedDb;
//     })
//     .catch((error) => {
//       console.log("Mongo connect Error");
//       console.log(error);
//     });
// };
