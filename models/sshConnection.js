import database from "./database";

export default async function sshConnections() {
  const db = await database();
  const collection = db.collection("ssh-connections");

  return collection;
}
