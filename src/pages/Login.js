import { useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// styles
import styles from './Login.module.css'
import {login} from "../services/authService";

export default function Login() {
  const email = useRef()
  const password = useRef()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    setIsPending(true);
    login(email.current.value, password.current.value)
    .then(() => {
        setIsPending(false)
        navigate('/')
    })
    .catch((error) => {
      // Handle Errors here.
      setIsPending(false)
      setError(error.message)
    });

  }

  return (              
      <form onSubmit={handleSubmit} className={styles['login-form']}>
        <h2>Login</h2>
        <label>
          <span>Email:</span>
          <input 
            type="email"
            ref={email}
            placeholder='Email...'
          />
        </label>
        <label>
          <span>Password:</span>
          <input 
            type="password"
            ref={password}
            placeholder='Password...'
          />
        </label>
        { !isPending && <button className="btn">Login</button> }
        { isPending && <button className="btn" disabled>loading</button> }
        { error && <p>{error}</p> }      
      </form>
  )
}