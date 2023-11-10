/* eslint-disable react/prop-types */
import type { PostsOrPages } from '@tryghost/content-api';

import PageLayout from '../../../components/layouts/PageLayout/PageLayout';
import PostCard from '../../../components/PostCard/PostCard';
import { getPosts } from '../../../lib/services/ghost';

const Posts = async ({ params }: { params: { slug: string } }) => {
  const posts = (await getPosts({ author: params.slug })) as PostsOrPages;

  const title = params.slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <PageLayout title={title} background="light">
      {posts.map((post) => {
        return <PostCard key={post.slug} post={post} category={params.slug} />;
      })}
    </PageLayout>
  );
};

export default Posts;
