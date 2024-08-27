import { ArrowForwardIos } from '@mui/icons-material'
import { Box, Checkbox, Divider, IconButton, ListItem, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Task } from '~/types/task';
import { TaskContext } from '~components/Home/Home';
type TodoItemProps = {
  task:Task,
}
export default function TodoItem({task}: TodoItemProps) {

  const {openRightBar} = useContext(TaskContext);

  return (
    <>
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center" width="100%">
          <Checkbox sx={{ marginRight: "16px" }} />
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Typography variant="h6">{task.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {task.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.category}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={()=>openRightBar(task)}>
          <ArrowForwardIos/>
        </IconButton>
      </ListItem>
      <Divider />
    </>
  )
}
