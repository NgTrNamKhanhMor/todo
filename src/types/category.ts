import { categories } from "~/const/categories";

export type CategoryValue = (typeof categories)[number]["value"];

export type Category = {
  name: string;
  value: string;
  color: string;
};
