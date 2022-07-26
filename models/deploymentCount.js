import database from "./database";

export default async function deploymentCounts() {
  const db = await database();
  const collection = db.collection("deployment-counts");

  return collection;
}
