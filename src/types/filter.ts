import { CategoryValue } from "./category";
import { CompletionsValue } from "./completions";
import { SortsValue } from "./sorts";

export type TodoFilter = {
  search?: string;
  category?: CategoryValue;
  sort?: SortsValue;
  completed?: CompletionsValue;
  date?: string;
  page?: number;
};
