import projects from '../../models/projects';

export default async function handler(req, res) {
  
  const collection = await projects();
  // const insertResult = await collection.insertMany([{ a: 4 }, { a: 5 }, { a: 6 }]);
  const insertResult = await collection.insertOne({"afor":"apple"});

  console.log('Inserted documents =>', insertResult);
  res.status(201).json({ message: "Data inserted successfully!" });

}
