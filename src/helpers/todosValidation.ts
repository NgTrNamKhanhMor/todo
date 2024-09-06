import * as Yup from "yup";
import { categories } from "~/const/categories";

const categoryValues = categories.map((category) => category.value);

export const todoSchema = Yup.object({
  name: Yup.string().required("Task Name is required"),
  description: Yup.string().required("Task Description is required"),
  category: Yup.string()
    .oneOf(categoryValues)
    .required("Task category is required"),
  date: Yup.string().required("Date is required"),
});
