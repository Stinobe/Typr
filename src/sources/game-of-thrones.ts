import sources from "../utils/source-base";

type GameOfThronseResponse = {
  sentence: string;
  character: {
    name: string;
    slug: string;
    house: {
      name: string;
      slug: string;
    };
  };
};

sources.register<GameOfThronseResponse>({
  title: "Game of Thrones",
  endpoint: "https://game-of-thrones-quotes.herokuapp.com/v1/random",
  author: "shevabam",
  link: "https://github.com/shevabam/game-of-thrones-quotes-api",
  callback: (jsonResponse) => ({
    author: jsonResponse.character.name,
    quote: jsonResponse.sentence,
  }),
});
