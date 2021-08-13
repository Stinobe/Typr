import sources from "../utils/source-base";

type ChuckNorrisApiResponse = {
  value: string;
};

sources.register<ChuckNorrisApiResponse>({
  title: "Chuck Norris Jokes",
  endpoint: "https://api.chucknorris.io/jokes/random",
  author: "matchilling",
  link: "https://github.com/chucknorris-io/chuck-api",
  callback: (jsonResponse) => ({
    quote: jsonResponse.value,
    author: "Someone funny",
  }),
});
