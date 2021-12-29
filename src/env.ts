import * as dotenv from 'dotenv';
import * as path from 'path';
import * as pkg from '../package.json';
import {
  getOsEnv,
  getOsEnvOptional,
  getOsPath,
  toBool,
  toNumber,
} from './libs/env/utils';
dotenv.config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
  ),
});
export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  app: {
    name: getOsEnv('APP_NAME'),
    version: pkg.version,
    description: pkg.description,
    host: getOsEnv('APP_HOST'),
    routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
    port: getOsEnv('APP_PORT'),
    banner: toBool(getOsEnv('APP_BANNER')),
  },
  log: {
    level: getOsEnvOptional('LOG_LEVEL'),
    json: toBool(getOsEnvOptional('LOG_JSON')),
    output: getOsEnvOptional('LOG_OUTPUT'),
    path: getOsPath('LOG_PATH'),
    request: toBool(getOsEnvOptional('LOG_REQUEST') || 'true'),
    requestBody: toBool(getOsEnvOptional('LOG_REQUEST_BODY') || 'false'),
    response: toBool(getOsEnvOptional('LOG_RESPONSE') || 'false'),
    error: toBool(getOsEnvOptional('LOG_ERROR') || 'false'),
  },
  db: {
    type: getOsEnv('TYPE'),
    host: getOsEnv('HOST'),
    username: getOsEnv('MYSQL_USERNAME'),
    password: getOsEnv('MYSQL_PASSWORD'),
    port: toNumber(getOsEnv('DB_PORT')),
    database: getOsEnv('DATABASE'),
    synchronize: toBool(getOsEnv('SYNCHRONIZE')),
  },
  jwt: {
    accessKey: getOsEnv('JWT_SECRET'),
    refreshKey: getOsEnv('JWT_REFRESH'),
    expirationTime: getOsEnv('JWT_EXPIRES_IN'),
  },
  redis: {
    host: getOsEnv('REDIS_HOST'),
    port: getOsEnv('REDIS_PORT'),
    ttl: getOsEnv('REDIS_TTL'),
  },
};
