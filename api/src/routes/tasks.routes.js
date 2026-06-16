import { Router } from "express";
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from "../controllers/tasks.controller.js";
import { createTaskSchema, updateTaskSchema, getTaskSchema, deleteTaskSchema } from "../validations/task.validations.js";
import { validate } from "../middlewares/validation.middleware.js";

const router = Router();

router
    .route("/")
    .get(getTasks)
    .post(validate(createTaskSchema), createTask);

router
  .route("/:id")
  .get(validate(getTaskSchema), getTaskById)
  .patch(validate(updateTaskSchema), updateTask)
  .delete(validate(deleteTaskSchema), deleteTask);

export { router as tasksRouter };