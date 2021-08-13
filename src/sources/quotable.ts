import sources from "../utils/source-base";

type QuotableResponse = {
  _id: string;
  tags: string[];
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModiefied: string;
};

sources.register<QuotableResponse>({
  title: "Quotable",
  endpoint: "https://api.quotable.io/random",
  author: "lukePeavey",
  link: "https://github.com/lukePeavey/quotable",
  callback: (jsonResponse) => ({
    author: jsonResponse.author,
    quote: jsonResponse.content,
  }),
});
