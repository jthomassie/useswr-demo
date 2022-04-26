// api/todos/index.js

import { connectToDatabase } from "../lib/database";
let col = process.env.MONGODB_COL;

module.exports = async (req, res) => {
  if (req.method === "GET") {
    let query = {};
    const { db } = await connectToDatabase();
    const todos = db.collection(col).find(query).limit(20).toArray();
    console.log("REQ", req.method);
    console.log("RES", res.data);
    console.log(" ");
    res.status(200).json({ todos });
  } else if (req.method === "POST") {
    const newtodo = req.body;
    const { db } = await connectToDatabase();
    const todos = db.collection(col).insertOne(newtodo);
    res.status(200).json({ todos, status: "API called sucessfully" });
  } else {
    res.status(404).json({ status: "Error route not found" });
  }
};
