import { ZodError } from "zod";
import { Prisma } from '../db.js';

/**
 * This function is a global error handler that catches all errors and returns a JSON response with the error message.
 * 
 * @param {*} err - The error object.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @param {*} next - The next function.
 * 
 * @returns {void}
 */
export const error  = (err, req, res, _next) => {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json(err.issues[0]).end();
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
    return res.status(404).json({ message: 'Element not found' }).end();
  }

  res
    .status(500)
    .json({ message: "Internal server error" })
    .end();
}