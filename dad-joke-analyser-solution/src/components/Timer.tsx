import React, { useState, useEffect } from "react";
import { computeTFIDF } from "../utils/computeTFIDF";
import { getApiCallPromise } from "../utils/api";

interface Props {
  jokes: any;
  settings: any;
  setTerms: any;
  setJokes: any;
}

const Timer: React.FC<Props> = ({ jokes, settings, setTerms, setJokes }) => {
  const [counter, updateCounter] = useState(10);

  useEffect(() => {
    const replaceLastJokeAndReCalcuteTFIDF = async () => {
      const resolved = await getApiCallPromise();
      const jokesCopy = [resolved, ...jokes];
      jokesCopy.pop();
      setTerms(computeTFIDF(jokesCopy, settings.terms, setJokes));
    };

    let interval: any;
    if (counter > 0) {
      interval = setInterval(() => {
        updateCounter((prevState) => prevState - 1);
      }, 1000);
    } else {
      replaceLastJokeAndReCalcuteTFIDF();
      updateCounter(10);
    }
    return () => clearInterval(interval);
  }, [counter, jokes, settings, setJokes, setTerms]);

  return <div>Timer: {counter}</div>;
};

export default Timer;
