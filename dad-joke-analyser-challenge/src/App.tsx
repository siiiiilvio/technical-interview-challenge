import React from "react";
import List from "./components/List";
import Settings from "./components/Settings";

const App = () => {
  return (
    <div className="App container">
      <Settings />
      <List />
    </div>
  );
};

export default App;
