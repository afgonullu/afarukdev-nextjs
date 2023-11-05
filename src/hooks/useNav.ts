import type { Authors, PostsOrPages } from '@tryghost/content-api';
import useSWR from 'swr';

import config from '../lib/config';
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

  const isLoading = isAuthorsLoading || isPagesLoading;
  const error = authorsError || pagesError;
  const data = {
    authors: authorsData.authors
      .filter((author) => author.name !== 'Landing')
      .map((author) => ({ title: author.name, slug: author.slug, svg: author.profile_image ?? '' })),
    pages: pagesData.pages.map((page) => ({ title: page.title, slug: page.slug, svg: page.feature_image ?? '' })),
  };

  const profileImage = authorsData.authors.find((author) => author.name === 'Landing')?.profile_image ?? '';

  return { data, error, isLoading, profileImage };
};

export default useNav;
