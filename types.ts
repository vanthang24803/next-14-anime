export type Anime = {
  id: String;
  name?: String;
  type?: Type;
  categories?: CATEGORY[];
  episode?: number;
  thumbnail?: string;
  description?: string;
  views?: number;
  author?: String;
  chapters?: Chapter[];
  comments?: Comments[];

  creatAt?: Date;
  updateAt?: Date;
};

export type Chapter = {
  id: string;
  name: string;
  title: string;
  thumbnail?: string;
  url: string;
  animeId: string;

  creatAt: string;
  upstringAt: string;
};

type Comments = {
  id: string;
  content: string;
  author: string;

  creatAt: Date;
  updateAt: Date;
};

enum Type {
  MOVIE,
  TV_SERIES,
}

export enum CATEGORY {
  ACTION,
  SCIENCE,
  ROMANTIC,
  HORROR,
  MARITAL,
  COMEDY,
  SCHOOL,
  DETECTIVE,
  MUSIC,
  REINCARNATION,
  ADVENTURE,
  EVERYDAY_LIFE,
  ROBOT,
}
