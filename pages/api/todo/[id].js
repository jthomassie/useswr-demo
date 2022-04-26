// api/todos/[id].js

import { connectToDatabase } from "../../lib/database";
// import { MongoClient } from "mongodb";
const ObjectId = require("mongodb").ObjectId;
let col = process.env.MONGODB_COL;

module.exports = async (req, res) => {
  if (req.method === "GET") {
    // const { id } = router.query;
    const { id } = req.query;
    let query = { _id: ObjectId(id) };
    // console.log("id", id);
    //
    const { db } = await connectToDatabase();
    const todo = await db.collection(col).find(query).toArray();
    // console.log("REQ", req);
    // console.log("query", query);
    // console.log("todo", todo);
    // console.log(" ");
    res.status(200).json({ todo });
  } else {
    res.status(404).json({ status: "Error route not found" });
  }
};
