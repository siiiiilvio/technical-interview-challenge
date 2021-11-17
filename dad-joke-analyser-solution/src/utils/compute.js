const rawJokes = [
  `Where do cats write notes? Scratch Paper!`,
  `In the news a courtroom artist was arrested today, I'm not surprised, he always seemed sketchy.`,
];

const jokes = [];

function addJoke(joke) {
  const regex = /(\w+)/g;
  const matches = joke.match(regex);

  if (matches === null) {
    throw new Error("null joke");
  }

  const wordCount = {};
  matches
    .map((word) => word.toLowerCase())
    .forEach((word) => {
      wordCount[word] = wordCount[word] || 0;
      wordCount[word] += 1;
    });
  jokes.push(wordCount);
}

function tf(term, jokeIdx) {
  return jokes[jokeIdx][term] || 0;
}

function df(term) {
  let count = 0;
  jokes.forEach((joke) => {
    if (term in joke && joke[term] > 0) {
      count++;
    }
  });
  return count;
}

function tfidf(term, jokeIdx) {
  const termFrequency = tf(term, jokeIdx);
  const documentFrequency = df(term);
  if (documentFrequency === 0) return 0;
  return termFrequency * Math.log(jokes.length / documentFrequency);
}

rawJokes.forEach((rj) => addJoke(rj));

function getAllTFIDF() {
  const allScores = [];
  jokes.forEach((joke, i) => {
    const scores = {};
    allScores.push(scores);
    for (const word in joke) {
      if (!(word in scores)) {
        scores[word] = tfidf(word, i);
      }
    }
  });
  return allScores;
}

const scores = getAllTFIDF();
console.log(scores);
