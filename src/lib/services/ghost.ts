import { Authors, PostOrPage, PostsOrPages } from '@tryghost/content-api';

import ghostApi, { endpoints } from '../ghost.client';

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
  const { data } = await ghostApi.get(endpoints.posts.browse, {
    params: {
      filter: 'primary_author:Landing',
      fields: 'id,title,slug,feature_image,plaintext,html,feature_image_alt,feature_image_caption',
      formats: 'html,plaintext',
      limit: 'all',
    },
  });

  const landingPosts: PostsOrPages = data.posts;

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
  const { data } = await ghostApi.get(endpoints.posts.browse, {
    params: {
      filter: [featured ? 'featured:true' : '', author ? `primary_author:${author}` : '']
        .filter((item) => item !== '')
        .join(','),
      include: 'authors',
      limit: 'all',
    },
  });

  const { posts }: { posts: PostsOrPages } = data;
  return posts;
};

export const getAuthors = async () => {
  const { data } = await ghostApi.get(endpoints.authors.browse, {
    params: {
      limit: 'all',
    },
  });

  const { authors }: { authors: Authors } = data;

  return authors;
};

export const getPages = async () => {
  const { data } = await ghostApi.get(endpoints.pages.browse, {
    params: {
      limit: 'all',
    },
  });

  const { pages }: { pages: PostsOrPages } = data;

  return pages;
};

export const getSinglePage = async (pageSlug: string) => {
  const { data } = await ghostApi.get(`${endpoints.pages.read}slug/${pageSlug}`);

  const page: PostOrPage = data.pages[0];

  return page;
};

export const getSinglePost = async (postSlug: string) => {
  const { data } = await ghostApi.get(`${endpoints.posts.read}slug/${postSlug}`);

  const post: PostOrPage = data.posts[0];

  return post;
};

export async function getSocialLinks() {
  const { data } = await ghostApi.get(endpoints.posts.browse, {
    params: {
      filter: 'tag:socialLink',
      formats: 'html,plaintext',
      limit: 'all',
    },
  });

  const socialLinks: PostsOrPages = data.posts;

  return socialLinks;
}

const ghost = {
  getLandingPosts,
  getPosts,
  getAuthors,
  getPages,
  getSinglePage,
  getSinglePost,
};

export default ghost;
