import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Todo } from "~/types/todo";
import { todoSchema } from "~helpers/todosValidation";
import { addTodo, fetchTodos, updateTodo } from "~redux/slices/todoSlices";
import { AppDispatch } from "~redux/store";
import { useGetCurrentUserId } from "./useGetCurrentUserId";

type UseTaskFormikProps = {
  selectedTask: Todo | null;
  closeRightBar: () => void;
};

export const useTaskFormik = ({
  selectedTask,
  closeRightBar,
}: UseTaskFormikProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currentUserId = useGetCurrentUserId();

  const formik = useFormik({
    initialValues: {
      name: selectedTask?.name || "",
      description: selectedTask?.description || "",
      category: selectedTask?.category || "",
      date: selectedTask?.date || "",
    },
    validationSchema: todoSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const taskData: Todo = {
        id: selectedTask?.id || 0,
        name: values.name,
        description: values.description,
        category: values.category,
        date: values.date,
        completed: selectedTask?.completed || false,
        user: currentUserId!,
      };

      try {
        if (taskData.id) {
          await dispatch(updateTodo(taskData)).unwrap();
        } else {
          await dispatch(addTodo(taskData)).unwrap();
        }

        await dispatch(fetchTodos(currentUserId!)).unwrap();

        resetForm();
        navigate("/");
        closeRightBar();
      } catch (error) {
        console.error("Failed to save task or fetch todos:", error);
      }
    },
  });

  return formik;
};
