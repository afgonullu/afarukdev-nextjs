import GhostContentAPI from '@tryghost/content-api';

import config from '../config';

const api = new GhostContentAPI({
  url: config.CONTENT_API_URL,
  key: config.CONTENT_API_KEY,
  version: 'v5.0',
});

// TODO: Add a defaultBrowseConfig object to this service.

const getLandingPosts = async () => {
  const landingPosts = await api.posts.browse({
    fields: ['id', 'title', 'slug'],
    limit: 'all',
    filter: 'primary_author:Landing',
    formats: ['html', 'plaintext'],
  });

  return landingPosts;
};

const ghost = {
  getLandingPosts,
};

export default ghost;
