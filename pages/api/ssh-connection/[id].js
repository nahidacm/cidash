import projects from "../../../models/sshConnection";
import {ObjectId} from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const hex = /[0-9A-Fa-f]{6}/g;
  const convertedId = (hex.test(id))? ObjectId(id) : id;

  const collection = await projects();

  if (req.method === "GET") {
    const project = await collection.findOne({ "_id": convertedId });
    res.json(project);
  }else if (req.method === "PATCH") {
    const updateResult = await collection.updateOne({ "_id": convertedId }, { $set: JSON.parse(req.body) });
    res.json(updateResult);
  }
}
