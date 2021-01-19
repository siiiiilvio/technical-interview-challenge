import React, { useState } from "react";
import { computeTFIDF } from "../utils/computeTFIDF";

interface Props {
  setJokes: React.Dispatch<React.SetStateAction<any[]>>;
  setTerms: React.Dispatch<React.SetStateAction<string[][]>>;
}

const Settings: React.FC<Props> = ({ setJokes, setTerms }) => {
  const API_RETRIES = 5;
  const ENDPOINT = "https://icanhazdadjoke.com/";
  const HEADERS = {
    headers: {
      Accept: "application/json",
      "User-Agent": "Technical Interview Challenge using icanhazdadjoke",
    },
  };

  const [state, setState] = useState({ jokes: 0, terms: 0 });

  const updateSettings = (value: number, key: string) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const fetchJokes = async (
    e: React.FormEvent<HTMLFormElement>,
    retries: number
  ) => {
    e.preventDefault();

    if (state.jokes > 0) {
      let promises = [];
      for (let i = 1; i <= state.jokes; i++) {
        let response = fetch(ENDPOINT, HEADERS).then((value) => value.json());
        promises.push(response);
      }

      const resolved = await Promise.all(promises).catch((error) => {
        fetchJokes(e, retries - 1);
        console.error(error.message);
      });

      if (resolved) {
        setTerms(computeTFIDF(resolved, state.terms, setJokes));
      }
    }
  };

  return (
    <section className="settings">
      <form onSubmit={(e) => fetchJokes(e, API_RETRIES)}>
        <label>
          Choose number of jokes:
          <input
            name="jokes"
            type="number"
            value={state.jokes}
            onChange={(e) =>
              updateSettings(parseInt(e.target.value), e.target.name)
            }
          />
        </label>
        <label>
          Choose number of popular terms:
          <input
            name="terms"
            type="number"
            value={state.terms}
            onChange={(e) =>
              updateSettings(parseInt(e.target.value), e.target.name)
            }
          />
        </label>
        <button>
          <img src="../../logo.png" alt="logo" />
        </button>
      </form>
    </section>
  );
};

export default Settings;
