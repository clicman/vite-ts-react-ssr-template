import dotenv from 'dotenv';

const { parsed, error } = dotenv.config();

if (error || !parsed) {
  throw new Error(`Could not get config ${error?.message}`);
}

const serverConfig = {
  serverHost: parsed.SERVER_HOST || '0.0.0.0',
  serverPort: parsed.SERVER_PORT || 3000,

  cacheExpireTimeSeconds: +parsed.CACHE_EXPIRE_TIME_SECONDS ?? 60,
};

export default serverConfig;
