import { useState, useEffect } from 'react';

import { getTasks, deleteTask } from './services/tasks.service';

import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskItem } from './components/TaskItem';

import styles from './App.module.css';
import './App.css';

function App() {
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    setTask(tasks.find(t => t.id === id));
  };

  const handleCancel = () => {
    setTask(null);
  };

  return (
    <>
      <h1 className={styles.title}>My awesome todo list</h1>
      
      <TaskForm key={task?.id} task={task} setTasks={setTasks} />

      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} onCancel={handleCancel} />
        ))}
      </TaskList>
    </>
  )
}

export default App
