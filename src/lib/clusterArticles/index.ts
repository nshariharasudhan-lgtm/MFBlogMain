import { GROUP_1_ARTICLES } from "./group1Basics";
import { GROUP_2_ARTICLES } from "./group2Calculators";
import { GROUP_3_ARTICLES } from "./group3Comparisons";
import { GROUP_4_ARTICLES } from "./group4Research";
import { ArticlePost } from "../../types";

export const CLUSTER_50_ARTICLES: ArticlePost[] = [
  ...GROUP_1_ARTICLES,
  ...GROUP_2_ARTICLES,
  ...GROUP_3_ARTICLES,
  ...GROUP_4_ARTICLES,
];

export {
  GROUP_1_ARTICLES,
  GROUP_2_ARTICLES,
  GROUP_3_ARTICLES,
  GROUP_4_ARTICLES,
};
