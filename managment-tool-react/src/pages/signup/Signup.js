import { useState } from "react";
import styles from "./Signup.module.css";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const { signup, error, isPending, accountCreated } = useSignup();

  const loginHandler = (e) => {
    e.preventDefault();
    signup(username, email, password, passwordRepeat);
  };

  return (
    <>
      {accountCreated && (
        <>
          <h2>Account created.</h2>
          <a href="/login">Click here to sign in!</a>
        </>
      )}
      {!accountCreated && (
        <>
          <h1>Signup</h1>
          <form className={styles["signup-form"]} onSubmit={loginHandler}>
            <label>
              <span>Username</span>
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"></input>
            </label>
            <label>
              <span>Password</span>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"></input>
            </label>
            <label>
              <span>Repeat password</span>
              <input
                value={passwordRepeat}
                onChange={(e) => {
                  setPasswordRepeat(e.target.value);
                }}
                type="password"></input>
            </label>
            <label>
              <span>Email</span>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"></input>
            </label>
            <button>Signup</button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
          {isPending && <p>Loading...</p>}
          <a href="/login">Already have an account? Login here!</a>
        </>
      )}
    </>
  );
}
