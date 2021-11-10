import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

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
      <form onSubmit={loginHandler}>
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
    </>
  );
}
