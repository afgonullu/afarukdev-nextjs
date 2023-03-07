import * as env from 'env-var';

const NEXT_PUBLIC_STRING = env.get('NEXT_PUBLIC_STRING').required().asString();

const config = {
  NEXT_PUBLIC_STRING,
};

export default config;
