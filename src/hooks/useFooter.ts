import type { PostsOrPages } from '@tryghost/content-api';
import axios from 'axios';
import useSWR from 'swr';

import config from '../lib/config';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useFooter = () => {
  const {
    data: socialsData = { posts: [] },
    error: socialsError,
    isLoading: isSocialsLoading,
  } = useSWR<{ posts: PostsOrPages }>(
    `${config.url}/ghost/api/content/posts/?key=${config.key}&formats=html,plaintext&include=tags&filter=tag:socialLink`,
    fetcher
  );

  const isLoading = isSocialsLoading;
  const error = socialsError;
  const data = socialsData.posts.map((social) => ({
    title: social.title,
    slug: social.slug,
    svg: (social.feature_image as string) ?? '',
    color: social.feature_image_caption ?? '',
    text: social.feature_image_alt ?? '',
    link: social.plaintext ?? '',
  }));

  return { data, error, isLoading };
};

export default useFooter;
