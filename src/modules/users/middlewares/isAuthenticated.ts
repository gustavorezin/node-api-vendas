import { authConfig } from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }
  // Bearer eyjasdasjdassldadkjas.eyadsdad.adsas...
  const token = authHeader.split(' ')[1];

  try {
    verify(token, authConfig.jwt.secret);
    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token.');
  }
}
