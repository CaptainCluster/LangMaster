import * as auth from "./authenticate";
import * as user from "./user";
import * as workshop from "./workshop";
import * as news from "./news"
import * as learn from "./learn"

export const api = {
  auth: auth,
  user: user,
  learn: learn,
  workshop: workshop,
  news: news,
};
