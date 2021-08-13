import Sources from "../utils/source-base";

type BreakingBadApiResponse = {
  quote: string;
  author: string;
};

Sources.register<BreakingBadApiResponse[]>({
  title: "Breaking Bad",
  endpoint: "https://breaking-bad-quotes.herokuapp.com/v1/quotes",
  author: "shevabam",
  link: "https://github.com/shevabam/breaking-bad-quotes",
  callback: (jsonResponse) => ({
    quote: jsonResponse[0].quote,
    author: jsonResponse[0].author,
  }),
});
