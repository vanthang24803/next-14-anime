export type Anime = {
  id: string;
  name?: String;
  type?: Type;
  categories?: CATEGORY[];
  episode?: number;
  thumbnail?: string;
  description?: string;
  views?: number;
  author?: string;
  seasonId?: string;
  chapters?: Chapter[];
  comments?: Comments[];

  creatAt?: string;
  updateAt?: string;
};

export type Season = {
  id: string;
  thumbnail?: string;
  href?: string;
  name?: string;
  Anime?: Anime[];
  createdAt: string;
  updatedAt: string;
};

export type Banner = {
  id: string;
  url: string;
  href: string;
};

export type Chapter = {
  id: string;
  name: string;
  title: string;
  thumbnail?: string;
  url: string;
  views: number;
  animeId: string;

  createdAt: string;
  updateAt: string;
};

export type Comments = {
  id: string;
  content: string;
  avatar: string;
  authorName: string;
  author: string;
  animeId: string;

  createdAt: string;
  updateAt: string;
};

export enum Type {
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
