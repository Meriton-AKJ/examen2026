import { useState } from 'react';
import { createTask, updateTask } from '../services/tasks.service';
import styles from './TaskForm.module.css';

export function TaskForm({ task, setTasks }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'todo');
  const [error, setError] = useState(null);
  const [mode, setMode] = useState(task ? 'edit' : 'create');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === 'edit') {
        const updated = await updateTask(task.id, { title, description, status });
        setTasks(prevTasks => prevTasks.map(t => t.id === updated.id ? updated : t));
      } else {
        const created = await createTask({ title, description, status });
        setTasks(prevTasks => [...prevTasks, created]);
      }

      setTitle('');
      setDescription('');
      setStatus('todo');
      setMode('create');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.input}
        >
          <option value="todo">Todo</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit" className={styles.button}>{mode === 'edit' ? 'Update Task' : 'Add Task'}</button>
      </form>
    </>
  );
}