import projects from "../../../models/projects";
import {ObjectId} from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  const collection = await projects();

  if (req.method === "GET") {
    const project = await collection.findOne({ "_id": ObjectId(id) });
    res.json(project);
  }else if (req.method === "PATCH") {
    const updateResult = await collection.updateOne({ "_id": ObjectId(id) }, { $set: JSON.parse(req.body) });
    res.json(updateResult);
  }
}
