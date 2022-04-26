// pages/api/landsname.js

import { connectToDatabase } from "../lib/database";
import { sevenCounty } from "../../geojson/sevenCounty";

let col = process.env.MONGODB_COL;
// is point within 7-couunty boundary
let geoquery = {
  "geometry.coordinates": {
    $geoWithin: {
      $geometry: sevenCounty,
    },
  },
};
let lands_name = {
  _id: "$properties.LANDS_NAME",
  count: { $count: {} },
};

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const { db } = await connectToDatabase();
    const collection = await db.collection(col);
    const landsnames = await collection
      .aggregate([
        { $match: geoquery },
        { $group: lands_name },
        { $sort: { count: -1, "properties.LANDS_NAME": 1 } },
      ])
      .toArray();
    res.status(200).json({ landsnames }).pretty();
  } else {
    res.status(404).json({ status: "Error route not found" });
  }
};
