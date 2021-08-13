import sources from "../utils/source-base";

type DadJokesResponse = {
  id: string;
  joke: string;
  status: number;
};

sources.register<DadJokesResponse>({
  title: "Dad Jokes",
  endpoint: "https://icanhazdadjoke.com/",
  author: "C653 Labs",
  link: "https://icanhazdadjoke.com/",
  callback: (jsonResponse) => ({
    author: "A dad",
    quote: jsonResponse.joke,
  }),
});
