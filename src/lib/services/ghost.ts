import GhostContentAPI from '@tryghost/content-api';

import config from '../config';

const api = new GhostContentAPI({
  url: config.CONTENT_API_URL,
  key: config.CONTENT_API_KEY,
  version: 'v5.0',
});

// TODO: Add a defaultBrowseConfig object to this service.

export interface ILandingContent {
  hero: {
    title: string;
    greeting: string;
    description: string;
  };
}

const getLandingPosts = async (): Promise<ILandingContent> => {
  const landingPosts = await api.posts.browse({
    fields: ['id', 'title', 'slug'],
    limit: 'all',
    filter: 'primary_author:Landing',
    formats: ['html', 'plaintext'],
  });

  const content = {
    hero: {
      title: landingPosts.find((post) => post.title === 'heroTitle')?.plaintext as string,
      greeting: landingPosts.find((post) => post.title === 'heroGreeting')?.plaintext as string,
      description: landingPosts.find((post) => post.title === 'heroDescription')?.plaintext as string,
    },
  };

  return content;
};

const ghost = {
  getLandingPosts,
};

export default ghost;
