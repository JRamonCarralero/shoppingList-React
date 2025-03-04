import { useState } from "react"
import styles from "../app/page.module.css"

/**
 * Login component that renders a login form with email and password inputs.
 * 
 * @param {Object} props - Component props.
 * @param {function} props.onLogin - Callback function to handle the login action.
 * 
 * This component manages internal state for email and password using React hooks.
 * When the form is submitted, it calls the onLogin function with the email and password,
 * and then resets the input fields.
 * 
 * @returns {JSX.Element} A JSX form element that allows users to input their email
 * and password to perform a login action.
 */
export default function Login({ onLogin}) {
  const [email, onSetEmail] = useState('')
  const [password, onSetPassword] = useState('')
  
/**
 * Sends the login form data by calling the onLogin callback with
 * the current email and password values. After submission, it resets
 * the email and password input fields to empty strings.
 */
  function sendForm() {
    onLogin(email, password)
    onSetEmail('')
    onSetPassword('')
  }
  return (
    <form className={styles.loginForm} onSubmit={(e) => e.preventDefault()}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => onSetEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => onSetPassword(e.target.value)} />
      <button type="submit" onClick={(e) => sendForm()}>Login</button>
    </form>
  )
}