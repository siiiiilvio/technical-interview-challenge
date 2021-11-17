const rawJokes = [
  `What do you do when your bunny gets wet? You get your hare dryer.`,
  `What did the left eye say to the right eye? Between us, something smells!`,
  `Where do cats write notes? Scratch Paper!`,
  `What kind of award did the dentist receive? A little plaque.`,
];

const sanitizeJoke = (sentence) => {
  var regex = /[!"#$%&()*+,“”.…/:;<=>?@[\]^_`{|}~]/g;
  const sanitizedSentence = sentence
    .replace(regex, "")
    .replace("\r", " ")
    .replace("\n", " ")
    .replace(" - ", " ")
    .replace("  ", " ")
    .toLowerCase()
    .trim();
  return sanitizedSentence.split(" ");
};

const tfidf = (term, index) => {
  const TF = (jokes[index][term] || 0) / jokes[index]._total;
  const IDF = Math.log(jokes.length / global[term].count);
  return TF * IDF;
};

const global = {};
const jokes = [];
const totalScores = [];

for (let i = 0; i < rawJokes.length; i++) {
  const words = sanitizeJoke(rawJokes[i]);
  const local = {
    _total: 0,
  };
  for (let j = 0; j < words.length; j++) {
    if (local[words[j]] > 0) {
      local[words[j]] = local[words[i]] + 1;
    } else {
      local[words[j]] = 1;
    }
    local["_total"] = local["_total"] + 1;

    if (
      global[words[j]] &&
      global[words[j]]["count"] > 0 &&
      global[words[j]]["currentIndex"] !== i
    ) {
      global[words[j]]["count"] = global[words[j]]["count"] + 1;
      global[words[j]]["currentIndex"] = i;
    } else if (!global[words[j]]) {
      global[words[j]] = {
        count: 1,
        currentIndex: i,
      };
    }
  }
  jokes.push(local);
}

for (let k = 0; k < jokes.length; k++) {
  const scores = [];
  for (const term in jokes[k]) {
    if (term !== "_total") scores.push([term, tfidf(term, k)]);
  }
  const sorted = scores.sort((a, b) => {
    return b[1] - a[1];
  });
  totalScores.push(sorted);
}

// console.log(jokes);
// console.log(global);
console.log(totalScores);
