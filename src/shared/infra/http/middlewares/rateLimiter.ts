import { AppError } from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5, // numero de requisições por {duration} por IP
  duration: 1 // 1 seg
});

export async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const ipAddress = request.ip || 'unknown';

    await limiter.consume(ipAddress);

    return next();
  } catch (error) {
    console.log(error);
    throw new AppError(`Too many requests.`, 429);
  }
}
