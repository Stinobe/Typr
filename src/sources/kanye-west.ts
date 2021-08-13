import sources from "../utils/source-base";

type DadJokesResponse = {
  quote: string;
};

sources.register<DadJokesResponse>({
  title: "Kanye West",
  endpoint: "https://api.kanye.rest/",
  author: "ajzbc",
  link: "https://github.com/ajzbc/kanye.rest",
  callback: (jsonResponse) => ({
    author: "Kanye West",
    quote: jsonResponse.quote,
  }),
});
