import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUser } from '../../lib/hooks';

export default function SignupPage() {
  const [user, { mutate }] = useUser()
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter();

  console.log('user swr: ', user);
  

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      name: e.currentTarget.name.value,
    }

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`)
      return
    }

    const res = await fetch('/api/auth/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });


    if (res.status === 201) {
      console.log('gese');
      
      const userObj = await res.json()
      // set user to useSWR state
      console.log("userObj: ", userObj);
      mutate(userObj);
    } else {
      console.log('gese error');
      
      setErrorMsg(await res.text())
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    console.log('user useEffect: ', user);
    
    if (user) router.push('/')
  }, [user, router])

  return (
    <>
      <h1>Sign up to Example</h1>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <label>
            <span>Username</span>
            <input type="text" name="username" required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" required />
          </label>
          <label>
            <span>Repeat password</span>
            <input type="password" name="rpassword" required />
          </label>
          <label>
            <span>Name</span>
            <input type="text" name="name" required />
          </label>
          <div className="submit">
            <button type="submit">Sign up</button>
            <Link href="/login">
              <a>I already have an account</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}