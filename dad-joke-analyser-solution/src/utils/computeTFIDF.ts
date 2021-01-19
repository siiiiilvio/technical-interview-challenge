const buildDataStructure = (array: any[], callback: any) => {
  const dataStructure: any = {};
  const uniqueJokes = array.filter((item) => {
    const joke: string = sanitizeJoke(item.joke);
    const isUnique = !dataStructure[joke];
    dataStructure[joke] = {
      wordsArray: joke.split(" "),
      words: {},
    };
    return isUnique && item;
  });

  console.log("uniqueJokes: ", uniqueJokes);
  callback(uniqueJokes);
  return dataStructure;
};

const sanitizeJoke = (sentence: string) => {
  var regex = /[!"#$%&()*+,“”.…/:;<=>?@[\]^_`{|}~]/g;
  const sanitizedSentence = sentence
    .replace(regex, "")
    .replace("\r", " ")
    .replace("\n", " ")
    .replace(" - ", " ")
    .replace("  ", " ")
    .toLowerCase()
    .trim();
  return sanitizedSentence;
};

const getDocumentsWithTermInItCount = (word: string, dataStructure: any) => {
  let count = 0;
  Object.keys(dataStructure).forEach((key) => {
    if (key.includes(word)) count++;
  });
  return count;
};

const getIDF = (word: string, length: number, dataStructure: any) => {
  return (
    Math.log(length / getDocumentsWithTermInItCount(word, dataStructure)) || 1
  );
};

export const computeTFIDF = (array: any[], terms: number, callback: any) => {
  const documentsTFIDF: any = [];
  const dataStructure = buildDataStructure(array, callback);

  if (terms > 0) {
    Object.keys(dataStructure).forEach((key) => {
      const wordsArray = dataStructure[key]["wordsArray"];
      wordsArray?.forEach((word: string, index: number) => {
        const numberOfTimes = key.split(word).length - 1;
        dataStructure[key]["words"][word] =
          (numberOfTimes / wordsArray.length) *
          getIDF(word, array.length, dataStructure);
      });

      const sorted = Object.entries(dataStructure[key]["words"])
        .sort((a: any, b: any) => {
          return b[1] - a[1];
        })
        .map((set) => set[0]);

      documentsTFIDF.push(sorted.slice(0, terms));
    });
  }

  return documentsTFIDF || [];
};
