import "./App.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  const { authToken, userId, userName } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <div>{authToken}</div>
      <div>{userId}</div>
      <div>{userName}</div>
    </div>
  );
}

export default App;
