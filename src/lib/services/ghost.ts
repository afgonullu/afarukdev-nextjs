'use-client';

import GhostContentAPI from '@tryghost/content-api';

import config from '../config';

const api = new GhostContentAPI({
  url: config.url!,
  key: config.key!,
  version: 'v5.0',
});

// TODO: Add a defaultBrowseConfig object to this service.

export interface ILandingContent {
  hero: {
    title: string;
    greeting: string;
    text: string;
  };
  aboutMe: {
    title: string;
    text: string;
    image: string;
  };
  services: {
    title: string;
    text: string;
    image: string;
  };
}

const getLandingPosts = async (): Promise<ILandingContent> => {
  const landingPosts = await api.posts.browse({
    fields: ['id', 'title', 'slug', 'feature_image', 'plaintext', 'html', 'feature_image_alt', 'feature_image_caption'],
    limit: 'all',
    filter: 'primary_author:Landing',
    formats: ['html', 'plaintext'],
  });

  const content = {
    hero: {
      title: landingPosts.find((post) => post.title === 'heroTitle')?.plaintext as string,
      greeting: landingPosts.find((post) => post.title === 'heroGreeting')?.plaintext as string,
      text: landingPosts.find((post) => post.title === 'heroText')?.plaintext as string,
    },
    aboutMe: {
      title: landingPosts.find((post) => post.title === 'aboutMeTitle')?.plaintext as string,
      text: landingPosts.find((post) => post.title === 'aboutMeText')?.html as string,
      image: landingPosts.find((post) => post.title === 'aboutMeText')?.feature_image as string,
    },
    services: {
      title: landingPosts.find((post) => post.title === 'servicesTitle')?.plaintext as string,
      text: landingPosts.find((post) => post.title === 'servicesText')?.html as string,
      image: landingPosts.find((post) => post.title === 'servicesText')?.feature_image as string,
    },
  };

  return content;
};

export const getPosts = async ({ featured, author }: { featured?: boolean; author?: string }) => {
  const posts = await api.posts.browse({
    limit: 'all',
    include: 'authors',
    filter: [featured ? 'featured:true' : '', author ? `primary_author:${author}` : '']
      .filter((item) => item !== '')
      .join(','),
  });

  return posts;
};

export const getAuthors = async () => {
  const authors = await api.authors.browse({ limit: 'all' });

  return authors;
};

export const getPages = async () => {
  const pages = await api.pages.browse({ limit: 'all' });

  return pages;
};

export async function getSinglePost(postSlug: string) {
  const post = api.posts.read({
    slug: postSlug,
  });

  return post;
}

const ghost = {
  getLandingPosts,
  getPosts,
  getAuthors,
  getPages,
  getSinglePost,
};

export default ghost;
