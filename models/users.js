import database from "./database";

export default async function users() {
  const db = await database();
  const collection = db.collection("users");

  return collection;
}
