import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import users from '../models/users';

async function getCollection() {
  const usersCollection = await users();
  return usersCollection;
}

export function getAllUsers(req) {
  // For demo purpose only. You are not likely to have to return all users.
  return req.session.users
}

export async function createUser(req, { username, password, name }) {
  console.log('in createuser func: ', username, password, name);
  
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    username,
    name,
    hash,
    salt,
  }

  console.log('user in createuser: ', user);

  // Here you should insert the user into the database
  const collection = await getCollection();
  
  const insertResult = await collection.insertOne(user);
  
  if(insertResult?.acknowledged) {
    return {success: true, result: 'Added to database'};
  }
  // req.session.users.push(user);
}

export function findUserByUsername(req, username) {
  console.log('username findUserByUsername: ', username);
  
  // Here you find the user based on id/username in the database
  // const user = await db.findUserById(id)
  return req.session.users.find((user) => user.username === username)
}

export function updateUserByUsername(req, username, update) {
  // Here you update the user based on id/username in the database
  // const user = await db.updateUserById(id, update)
  const user = req.session.users.find((u) => u.username === username)
  Object.assign(user, update)
  return user
}

export function deleteUser(req, username) {
  // Here you should delete the user in the database
  // await db.deleteUser(req.user)
  req.session.users = req.session.users.filter(
    (user) => user.username !== req.user.username
  )
}

// Compare the password of an already fetched user (using `findUserByUsername`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}