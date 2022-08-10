import nextConnect from 'next-connect';
import auth from '../../../middleware/auth';
import { getAllUsers, createUser, findUserByUsername } from '../../../lib/db';
import argon2 from 'argon2';

const handler = nextConnect();

handler
  .use(auth)
  // .get((req, res) => {
  //   // For demo purpose only. You will never have an endpoint which returns all users.
  //   // Remove this in production
  //   res.json({ users: getAllUsers(req) })
  // })
  .post(async(req, res) => {
    
    const { username, password, name } = req.body;
    
    if (!username || !password || !name) {
      return res.status(400).send('Missing fields')
    }
    // Here you check if the username has already been used
    const usernameExisted = !!findUserByUsername(req, username);
    
    if (usernameExisted) {
      return res.status(409).send('The username has already been used')
    }
    let user = { username, password, name };
    
    // Security-wise, you must hash the password before saving it
    const hashedPass = await argon2.hash(password);
    if(hashedPass) {
      user.password = hashedPass;
    }
    // user = { username, password: hashedPass, name };
    createUser(req, user)
    .then((result) => {
      if(result?.success) {
        console.log('result after succ l: ', result);
        return res.status(201).json({ message: "Data inserted successfully!" });
      }
    })
    .catch((error) => {
      console.log('error in catch: ', error);
      
      return res.status(500).json({
        result: {
          success: false,
          error,
        }
      });
    });

    console.log('after err');
    

    // req.logIn(user, (err) => {
    //   if (err) throw err
    //   // Log the signed up user in
    //   res.status(201).json({
    //     user,
    //   })
    // })
  })

export default handler