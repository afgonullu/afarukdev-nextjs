import * as env from 'env-var';

const CONTENT_API_URL = env.get('CONTENT_API_URL').required().asString();
const CONTENT_API_KEY = env.get('CONTENT_API_KEY').required().asString();

const config = {
  CONTENT_API_KEY,
  CONTENT_API_URL,
};

export default config;
