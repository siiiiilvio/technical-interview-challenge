import React, { useState } from "react";
import List from "./components/List";
import Settings from "./components/Settings";

const App = () => {
  const [jokes, setJokes] = useState<any[]>([]);
  const [terms, setTerms] = useState<string[][]>([]);

  return (
    <div className="App container">
      <Settings setJokes={setJokes} setTerms={setTerms} />
      <List jokes={jokes} terms={terms} />
    </div>
  );
};

export default App;
