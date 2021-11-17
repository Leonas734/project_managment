import "./App.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import AccountSettings from "./pages/account_settings/AccountSettings";
import Nav from "./components/nav/Nav";

function App() {
  const { userId, userName } = useAuthContext();

  return (
    <div className="App">
      {userName && <Nav userName={userName} />}
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={userId ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="project_task/:task_id"
            element={userId ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="project/:project_id"
            element={userId ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={userId ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={userId ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/account_settings"
            element={userId ? <AccountSettings /> : <Navigate to="/login" />}
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
