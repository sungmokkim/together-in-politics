import { NextFunction, Request, Response } from 'express';

const defaultOptions = {
  catch: false,
};

const controllerHandler = (
  promise, params, options = defaultOptions,
) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];

  try {
    const result = await promise(...boundParams);

    res.locals.result = result;

    if (options.catch) {
      return next();
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(null);
  }
};

export default controllerHandler;
