import React from "react";

import style from "./styles/App.module.css";

import General from "./views/General";

function App() {
  return (
    <div className={style.App}>
      <General />
    </div>
  );
}

export default App;
