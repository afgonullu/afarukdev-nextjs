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
      <p className="mb-8 text-center text-2xl text-gray-900">
        {title === 'Writings' &&
          "These are my journals, thoughts, and ideas. Sometimes it is a short story, sometimes it is a poem, sometimes it is a rant. I don't know what I will write next, but I will write something."}
        {title === 'Projects' &&
          'These are my projects. Some are finished, some are not. Some are good, some are not. Some are useful, some are not. But they are all mine.'}
      </p>
      {posts.map((post) => {
        return <PostCard key={post.slug} post={post} category={params.slug} />;
      })}
    </PageLayout>
  );
};

export default Posts;
