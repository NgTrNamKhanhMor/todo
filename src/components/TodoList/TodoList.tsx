import { Box, List } from '@mui/material';
import { Todo } from '~/types/todo';
import TodoItem from '~components/TodoList/TodoItem/TodoItem';
type TodoListProps = {
  tasks: Todo[],
}
export default function TodoList({ tasks }: TodoListProps) {

  return (
    <List sx={{ flexGrow: 1, width: 1 }}>
      {tasks.map((task) => (
        <Box key={task.id}>
          <TodoItem task={task} />
        </Box>
      ))}
    </List>
  )
}
