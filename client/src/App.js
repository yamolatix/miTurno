import React from 'react';
import { Route, Routes } from "react-router-dom";
import Register from './views/Register';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
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