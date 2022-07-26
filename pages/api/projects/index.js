import projects from "../../../models/projects";

export default async function handler(req, res) {
  const collection = await projects();

  if (req.method === "POST") {
    const insertResult = await collection.insertOne(JSON.parse(req.body));
    res.status(201).json({ message: "Data inserted successfully!" });
  } else if (req.method === "GET") {
    const projects = await collection.find({}).toArray();
    res.json(projects);
  }
}
