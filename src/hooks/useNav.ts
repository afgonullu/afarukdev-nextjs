import type { Authors, PostsOrPages } from '@tryghost/content-api';
import axios from 'axios';
import useSWR from 'swr';

import config from '../lib/config';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useNav = () => {
  const {
    data: authorsData = { authors: [] },
    error: authorsError,
    isLoading: isAuthorsLoading,
  } = useSWR<{ authors: Authors }>(`${config.url}/ghost/api/content/authors/?key=${config.key}`, fetcher);
  const {
    data: pagesData = { pages: [] },
    error: pagesError,
    isLoading: isPagesLoading,
  } = useSWR<{ pages: PostsOrPages }>(`${config.url}/ghost/api/content/pages/?key=${config.key}`, fetcher);

  const isLoading = isAuthorsLoading || isPagesLoading;
  const error = authorsError || pagesError;
  const data = [
    ...authorsData.authors
      .filter((author) => author.name !== 'Landing')
      .map((author) => ({ title: author.name, slug: author.slug, svg: author.profile_image ?? '' })),
    ...pagesData.pages.map((page) => ({ title: page.title, slug: page.slug, svg: page.feature_image ?? '' })),
  ];

  return { data, error, isLoading };
};

export default useNav;
