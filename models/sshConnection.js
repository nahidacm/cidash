import database from "./database";

export default async function projects() {
  const db = await database();
  const collection = db.collection("ssh-connections");

  return collection;
}
