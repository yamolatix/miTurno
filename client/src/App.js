import React from "react";
import { Route, Routes } from "react-router-dom";
import TurnosUsers from "./views/TurnosUser";
import General from "./views/General";
import Register from "./views/Register";
import Login from "./views/Login";
import AssistPassword from "./views/AssistPassword";
import RestorePassword from "./views/RestorePassword";
import Users from "./views/Users";
import MyAccount from "./views/MyAccount";

import style from "./styles/App.module.css";

function App() {
  return (
    <div className={style.App}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/layout" element={<General />} />
        <Route path="/users" element={<Users />} />
        <Route path="/calendar" element={<TurnosUsers />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/assist_password" element={<AssistPassword />} />
        <Route path="/restore_password" element={<RestorePassword />} />
        {/* 
        <Route path="/welcome" element={<Welcome />}/>
        <Route path="/branch_offices" element={<BranchOffices />}/>
 */}
      </Routes>
    </div>
  );
}

export default App;
