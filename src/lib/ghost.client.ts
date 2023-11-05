import axios from 'axios';

import config from './config';

const ghostApi = axios.create();

ghostApi.interceptors.request.use((c) => {
  return {
    ...c,
    url: `${config.url}${c.url}`,
    params: { ...c.params, key: config.key },
  };
});

export const fetcher = (url: string, params?: any) => ghostApi.get(url, { ...params }).then((res) => res.data);

export const endpoints = {
  posts: {
    browse: '/ghost/api/content/posts/',
    read: `/ghost/api/content/posts/`,
  },
  authors: {
    browse: '/ghost/api/content/authors/',
    read: `/ghost/api/content/authors/`,
  },
  tags: {
    browse: '/ghost/api/content/tags/',
    read: `/ghost/api/content/tags/`,
  },
  pages: {
    browse: '/ghost/api/content/pages/',
    read: `/ghost/api/content/pages/`,
  },
  settings: {
    browse: '/ghost/api/content/settings/',
  },
};

export default ghostApi;
