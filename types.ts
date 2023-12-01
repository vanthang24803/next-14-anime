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

type Chapter = {
  id: String;
  name: String;
  title: String;
  url: String;
  animeId: String;

  creatAt: Date;
  updateAt: Date;
};

type Comments = {
  id: String;
  content: String;
  author: String;

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
