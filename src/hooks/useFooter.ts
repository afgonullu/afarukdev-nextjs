import type { PostsOrPages } from '@tryghost/content-api';
import useSWR from 'swr';

import { fetcher } from '../lib/ghost.client';

const useFooter = () => {
  const {
    data: socialsData = { posts: [] },
    error: socialsError,
    isLoading: isSocialsLoading,
  } = useSWR<{ posts: PostsOrPages }>('socials', () =>
    fetcher(`/ghost/api/content/posts/`, {
      params: {
        filter: 'tag:socialLink',
        fields: 'title,slug,feature_image,feature_image_caption,feature_image_alt,plaintext',
      },
    })
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
