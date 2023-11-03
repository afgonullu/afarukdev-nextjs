import type { Authors, PostsOrPages } from '@tryghost/content-api';
import axios from 'axios';
import useSWR from 'swr';

import config from '../lib/config';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useNav = () => {
  const {
    data: authorsData = { authors: [] },
    error: authorsError,
    isLoading: isAuthorsLoading,
  } = useSWR<{ authors: Authors }>('authors', () =>
    fetcher(`${config.url}/ghost/api/content/authors/?key=${config.key}`)
  );
  const {
    data: pagesData = { pages: [] },
    error: pagesError,
    isLoading: isPagesLoading,
  } = useSWR<{ pages: PostsOrPages }>('pages', () =>
    fetcher(`${config.url}/ghost/api/content/pages/?key=${config.key}`)
  );

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
