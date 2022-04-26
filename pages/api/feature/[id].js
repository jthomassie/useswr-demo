// api/feature/[id].js

import { connectToDatabase } from "../../lib/database";
const ObjectId = require("mongodb").ObjectId;

let col = process.env.MONGODB_COL;

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;
    let query = { _id: ObjectId(id) };
    const { db } = await connectToDatabase();
    const feature = await db.collection(col).find(query).toArray();
    res.status(200).json({ feature });
  } else {
    res.status(404).json({ status: "Error route not found" });
  }
};
