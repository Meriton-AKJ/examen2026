const API_URL = `${import.meta.env.VITE_BASE_URL}/tasks`;

export const getTasks = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
}

export const createTask = async (task) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    const message = `[${error?.path?.[0] || 'unknown'}] ${error?.message || 'Unknown error'}`;
    throw new Error(message);
  }

  return response.json();
}

export const updateTask = async (id, task) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    const message = `[${error?.path?.[0] || 'unknown'}] ${error?.message || 'Unknown error'}`;
    throw new Error(message);
  }

  return response.json();
}

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }

  return { success: true };
}