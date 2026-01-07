import { ZodError } from 'zod';

export const validation = (schemas) => {
  return (req, res, next) => {
    try {
      for (const [key, schema] of Object.entries(schemas)) {
        const result = schema.parse(req[key]);
        req[key] = result;
      }
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: 'invalid data',
          details: err
        })
      }
      return res.status(500).json({ error: 'internal server errror', });
    }
  }
}