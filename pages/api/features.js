// pages/api/features.js

import { connectToDatabase } from "../lib/database";

let col = process.env.MONGODB_COL;

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const { db } = await connectToDatabase();
    const collection = await db.collection(col);
    const features = await collection.find({}).limit(50).toArray();
    res.status(200).json({ features });
  } else if (req.method === "POST") {
    const newfeature = req.body;
    const { db } = await connectToDatabase();
    const collection = await db.collection(col);
    const features = await collection.insertOne(newfeature);
    res.status(200).json({ features, status: "API called sucessfully" });
  } else {
    res.status(404).json({ status: "Error route not found" });
  }
};
