/**
 * @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState<string>('');
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [newTaskName, setNewTaskName] = useState<string>('');

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    handleFetchTasks();
  }

  const handleSave = async () => {
    if (currentTask && taskName && taskName !== currentTask.name) {
      // Sauvegarde en cas de modif
      await api.patch(`/tasks/${currentTask.id}`, { name: taskName });
      handleFetchTasks(); 
      setCurrentTask(null); 
      setTaskName(''); 
    }  
  }

  const handleEdit = (task: Task) => {
    if (currentTask?.id === task.id) {
      // annulation de l'édition en cas de double click
      setCurrentTask(null);
      setTaskName("");
    } else {
      setCurrentTask(task);
      setTaskName(task.name);
    }
  };

  const handleAddTask = async () => {
    if (newTaskName.trim()) {
      // Ajouter la nouvelle tâche
      await api.post('/tasks', { name: newTaskName });
      setNewTaskName(''); 
      handleFetchTasks(); 
    }
  }

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%" key={task.id}>
            <TextField
              size="small"
              value={currentTask?.id === task.id ? taskName : task.name}  
              fullWidth
              sx={{ maxWidth: 350 }}
              onChange={(e) => setTaskName(e.target.value)}  
              onFocus={() => handleEdit(task)}  
              InputProps={{
                readOnly: currentTask?.id !== task.id,  
              }}
            />

            <Box>
              
              <IconButton
                color="success"
                disabled={currentTask?.id !== task.id || taskName.trim() === "" || taskName === currentTask.name}  
                onClick={handleSave}
              >
                <Check />
              </IconButton>

              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <TextField
            size="small"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Ajouter une nouvelle tâche"
            fullWidth
            sx={{ maxWidth: 350 }}
          />
          <Button variant="outlined" onClick={handleAddTask} sx={{ marginLeft: 2 }}>
            Ajouter une tâche
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default TodoPage;
