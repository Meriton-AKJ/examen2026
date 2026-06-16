/**
 * This function generates a middleware that validates the request body, query parameters and path parameters using the provided schema. 
 * 
 * @param {*} schema
 * 
 * @returns {Function} A middleware function that validates the request body, query parameters and path parameters using the provided schema.
 */
export const validate = (schema) => (req, res, next) => {
  try {
    const payload = req.body;

    if (!payload) {
      return next();
    }

    const { data, error } = schema.safeParse(payload);

    if (error) {
      return next(error);
    }

    req.body = data;

    next();
  } catch (error) {
    next(error);
  }
}

export const validateQuery = (schema) => (req, res, next) => {
  try {
    const payload = req.query;

    if (!payload) {
      return next();
    }

    const { error } = schema.safeParse(payload);

    // to verify if zod found an error 
    if (error) {
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
}
