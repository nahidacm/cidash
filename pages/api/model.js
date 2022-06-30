import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb://admin:localadminpass@localhost:27017/cidash?authSource=admin&readPreference=primary&ssl=false"
    );
    const db = client.db();
    const projects = db.collection("projects");
    const result = await projects.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Data inserted successfully!" });
  }
}
