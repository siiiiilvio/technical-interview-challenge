const getDocumentsArray = (array: any[]) => {
  return array.map((item) => item.joke);
  // TODO Silvio split the document into words and sanitize the documents in this loop.
};

const transformStringIntoArrayOfStrings = (sentence: string) => {
  var regex = /[!"#$%&()*+,“”.…/:;<=>?@[\]^_`{|}~]/g;
  const sanitizedSentence = sentence
    .replace(regex, "")
    .replace(" - ", " ")
    .replace("  ", " ")
    .toLowerCase();
  return sanitizedSentence.split(" ");
};

const getDocumentsWithTermInItCount = (term: string, documents: string[]) => {
  let count = 0;
  documents.forEach((document) => {
    const arrayOfWords = transformStringIntoArrayOfStrings(document);
    if (arrayOfWords.some((word) => word === term)) {
      count++;
    }
  });
  return count;
};

export const computeTFIDF = (array: any[], terms: number) => {
  const documentsArray = getDocumentsArray(array);
  const documentsTFIDF: string[][] = [];

  documentsArray.forEach((item) => {
    const arrayOfWords = transformStringIntoArrayOfStrings(item);
    let numberOfTimes = 0;
    let dictionary: any = {};
    arrayOfWords.forEach((word: string, index: number) => {
      if (word === arrayOfWords[index]) numberOfTimes++;
      let TF = numberOfTimes / arrayOfWords.length;
      let IDF =
        Math.log(
          documentsArray.length /
            getDocumentsWithTermInItCount(word, documentsArray)
        ) || 1;
      if (!dictionary[word]) {
        dictionary[word] = TF * IDF;
      }
    });

    const sorted = Object.entries(dictionary)
      .sort((a: any, b: any) => {
        return b[1] - a[1];
      })
      .filter((tuple: any) => tuple[0] !== "")
      .map((tuple: any) => tuple[0]);

    documentsTFIDF.push(sorted.slice(0, terms));
  });
  return documentsTFIDF;
};
