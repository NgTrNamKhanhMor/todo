import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Todo } from "~/types/todo";
import { todoSchema } from "~helpers/todosValidation";
import { selectCurrentUserId } from "~helpers/user";
import { addTodo, updateTodo } from "~redux/slices/todoSlices";
import { AppDispatch } from "~redux/store";

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
  const currentUserId = selectCurrentUserId();

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

      if (taskData.id) {
        dispatch(updateTodo(taskData));
      } else {
        dispatch(addTodo(taskData));
      }
      resetForm();
      navigate("/");
      closeRightBar();
    },
  });

  return formik;
};
