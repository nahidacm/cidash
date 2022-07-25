import projects from "../../../models/users";
import {ObjectId} from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  const collection = await projects();

  if (req.method === "GET") {
    const user = await collection.findOne({ "_id": ObjectId(id) });
    res.json(user);
  }else if (req.method === "PATCH") {
    const updateResult = await collection.updateOne({ "_id": ObjectId(id) }, { $set: JSON.parse(req.body) });
    res.json(updateResult);
  }
  if (req.method === "DELETE") {
    const user = await collection.deleteOne({ "_id": ObjectId(id) });
    res.json(user);
  }
}
