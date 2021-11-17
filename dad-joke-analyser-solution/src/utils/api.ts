export const API_RETRIES = 5;
const ENDPOINT = "https://icanhazdadjoke.com/";
const HEADERS = {
  headers: {
    Accept: "application/json",
    "User-Agent": "Technical Interview Challenge using icanhazdadjoke",
  },
};

export const getApiCallPromise = async () => {
  return fetch(ENDPOINT, HEADERS).then((value) => value.json());
};