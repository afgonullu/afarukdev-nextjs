import type { Authors, PostsOrPages } from '@tryghost/content-api';
import useSWR from 'swr';

import { fetcher } from '../lib/ghost.client';

const useNav = () => {
  const {
    data: authorsData = { authors: [] },
    error: authorsError,
    isLoading: isAuthorsLoading,
  } = useSWR<{ authors: Authors }>('authors', () => fetcher(`/ghost/api/content/authors`));
  const {
    data: pagesData = { pages: [] },
    error: pagesError,
    isLoading: isPagesLoading,
  } = useSWR<{ pages: PostsOrPages }>('pages', () => fetcher(`/ghost/api/content/pages/`));

  const {
    data: postsData = { posts: [] },
    error: postsError,
    isLoading: isPostsLoading,
  } = useSWR<{ posts: PostsOrPages }>('posts', () =>
    fetcher(`/ghost/api/content/posts/`, {
      params: {
        include: 'authors',
        limit: 5,
        filter: 'primary_author:Projects,primary_author:Reflections',
        order: 'published_at DESC',
      },
    })
  );

  const {
    data: featuredData = { posts: [] },
    error: featuredError,
    isLoading: isFeaturedLoading,
  } = useSWR<{ posts: PostsOrPages }>('postsFeatured', () =>
    fetcher(`/ghost/api/content/posts/`, {
      params: {
        include: 'authors',
        limit: 5,
        filter: 'featured:true',
      },
    })
  );

  const isLoading = isAuthorsLoading || isPagesLoading || isPostsLoading || isFeaturedLoading;
  const error = authorsError || pagesError || postsError || featuredError;
  const data = {
    authors: authorsData.authors
      .filter((author) => author.name !== 'Landing')
      .map((author) => ({ title: author.name, slug: author.slug, svg: author.profile_image ?? '' })),
    pages: pagesData.pages
      .filter((page) => !page.title?.startsWith('Services'))
      .map((page) => ({ title: page.title, slug: page.slug, svg: page.twitter_image ?? '' })),
    services: pagesData.pages
      .filter((page) => page.title?.startsWith('Services'))
      .map((page) => ({
        title: page.title ?? '',
        slug: page.slug,
        image: page.feature_image ?? '',
        cardBody: page.feature_image_caption ?? '',
        svg: page.twitter_image ?? '',
        tagline: page.twitter_title ?? '',
      })),
    latestPosts: postsData.posts.map((post) => ({
      author: post.authors?.[0]?.name?.toLocaleLowerCase(),
      title: post.title,
      slug: post.slug,
      image: post.feature_image ?? '',
      cardBody: post.feature_image_caption ?? '',
      svg: post.twitter_image ?? '',
      tagline: post.twitter_title ?? '',
    })),
    featuredPosts: featuredData.posts,
  };

  const profileImage = authorsData.authors.find((author) => author.name === 'Landing')?.profile_image ?? '';

  return { data, error, isLoading, profileImage };
};

export default useNav;
