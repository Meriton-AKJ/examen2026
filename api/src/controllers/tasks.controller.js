import { prisma } from '../db.js';
import { StatusTask } from '../types/StatusTask.enum.js';

export const getTaskById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id, 10) }
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" }).end();
    }

    res
      .status(200)
      .json(task)
      .end();
  } catch (_error) {
    next(_error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany();

    res
      .status(200)
      .json(tasks)
      .end();
  } catch (_error) {
    next(_error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const newTask = {
      title,
      description,
      status: status || StatusTask.TODO,
    };

    const created = await prisma.task.create({
      data: newTask,
    });

    res
      .status(201)
      .json(created)
      .end();
  } catch (_error) {
    next(_error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await prisma.task.update({
      where: { id: parseInt(id, 10) },
      data: { title, description, status },
    });

    res.status(200).json(task).end();
  } catch (_error) {
    next(_error);
  }
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({ where: { id: parseInt(id, 10) } })

    res.status(204).end();
  } catch (_error) {
    next(_error);
  }
};
