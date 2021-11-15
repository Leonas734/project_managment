import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

import styles from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const loginHandler = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <>
      <h1>Login</h1>
      <form className={styles["login-form"]} onSubmit={loginHandler}>
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
        <button>Login</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {isPending && <p>Loading...</p>}
      <a href="/signup">No account? Sign up here!</a>
    </>
  );
}
