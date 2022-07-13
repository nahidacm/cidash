import projects from '../../models/projects';

export default async function handler(req, res) {
  
  const collection = await projects();
  const insertResult = await collection.insertOne(JSON.parse(req.body));

  console.log('Inserted documents =>', insertResult);
  res.status(201).json({ message: "Data inserted successfully!" });

}
