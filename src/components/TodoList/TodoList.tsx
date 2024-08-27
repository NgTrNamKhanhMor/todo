import { Box, List } from '@mui/material'
import TodoItem from './TodoItem/TodoItem';
import { Task } from '~/types/task';
type TodoListProps = {
  tasks:Task[],
}
export default function TodoList({tasks}: TodoListProps) {
 
  return (
    <List sx={{ flexGrow: 1, width: "100%" }}>
    {tasks.map((task) => (
      <Box key={task.id}>
       <TodoItem task={task}/>
      </Box>
    ))}
  </List>
  )
}
