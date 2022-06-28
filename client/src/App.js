import React from "react";
import { Route, Routes } from "react-router-dom";

import General from "./views/General";
import Register from "./views/Register";
import Users from "./views/Users";

import style from "./styles/App.module.css";

function App() {
  return (
    <div className={style.App}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/layout" element={<General />} />
        <Route path="/users" element={<Users />} />

        {/* <Route path="/login" element={<Login />}/>
        <Route path="/assist_password" element={<AssistPassword />}/>
        <Route path="/restore_password" element={<RestorePassword />}/>
        <Route path="/welcome" element={<Welcome />}/>
        <Route path="/branch_offices" element={<BranchOffices />}/>
 */}
      </Routes>
    </div>
  );
}

export default App;
