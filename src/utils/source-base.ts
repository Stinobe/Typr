import { v4 as uuid } from "uuid";
import { getRandom, sort } from "./arrays";

type SourceProps<T> = {
  endpoint: string;
  author: string;
  link: string;
  title: string;
  callback: (jsonResponse: T) => Quote;
};

export type Source = { id: string; path: string } & SourceProps<any>;

export type Quote = {
  quote: string;
  author: string;
};

class Sources {
  private static Instance: Sources;

  private static sources: Source[];

  private constructor() {
    Sources.sources = [];
  }

  public static init() {
    if (!Sources.Instance) {
      Sources.Instance = new Sources();
    }
    return Sources.Instance;
  }

  public static register<T>(config: SourceProps<T>) {
    this.sources.push({
      ...config,
      id: uuid(),
      path: config.title
        .replace(/[^a-z0-9_]+/gi, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase(),
    });
  }

  public static unregister(id: string) {
    this.sources = this.sources.filter((source) => source.id !== id);
  }

  public static getRandomLibrary(): Source {
    return getRandom(this.list);
  }

  public static async getRandomQuote(path: string) {
    const lib = this.getByPath(path);
    if (!lib) throw Error("No valid source was selected");
    const response = await fetch(lib.endpoint, {
      headers: {
        Accept: "application/json",
      },
    });
    const json = await response.json();
    return lib.callback(json);
  }

  public static getByPath(path: string) {
    return this.sources.find((source) => source.path === path);
  }

  public static get list() {
    return this.sources.sort(sort);
  }

  public static getTitle(path: string): string {
    return this.sources.find((source) => source.path === path)?.title || "";
  }
}

Sources.init();

export default Sources;
