import React, { useState, useRef } from "react";
import List from "./components/List";
import Settings from "./components/Settings";
import Timer from "./components/Timer";
import { computeTFIDF } from "./utils/computeTFIDF";
import { getApiCallPromise, API_RETRIES } from "./utils/api";

const App = () => {
  const [jokes, setJokes] = useState<any[]>([]);
  const [terms, setTerms] = useState<string[][]>([]);
  const [settings, setSettings] = useState({ jokes: 0, terms: 0 });
  const timer = useRef(false);

  const updateSettings = (value: number, key: string) => {
    setSettings((prevState) => ({ ...prevState, [key]: value }));
  };

  const fetchJokes = async (
    e: React.FormEvent<HTMLFormElement>,
    retries: number = API_RETRIES
  ) => {
    e.preventDefault();

    if (settings.jokes > 0) {
      let promises = [];
      for (let i = 0; i < settings.jokes; i++) {
        let promise = getApiCallPromise();
        promises.push(promise);
      }

      const resolved = await Promise.all(promises).catch((error) => {
        fetchJokes(e, retries - 1);
        console.error(error.message);
      });

      if (resolved) {
        timer.current = !timer.current;
        setTerms(computeTFIDF(resolved, settings.terms, setJokes));
      }
    }
  };

  return (
    <div className="App container">
      <Settings
        updateSettings={updateSettings}
        fetchJokes={fetchJokes}
        settings={settings}
      />
      <List jokes={jokes} terms={terms} />
      {timer.current && (
        <Timer
          jokes={jokes}
          settings={settings}
          setTerms={setTerms}
          setJokes={setJokes}
        />
      )}
    </div>
  );
};

export default App;
