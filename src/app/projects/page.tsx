/* eslint-disable react/prop-types */
import type { PostsOrPages } from '@tryghost/content-api';

import PageLayout from '../../components/layouts/PageLayout/PageLayout';
import PostCard from '../../components/PostCard/PostCard';
import { getPosts } from '../../lib/services/ghost';

const Projects = async () => {
  const posts = (await getPosts({ author: 'projects' })) as PostsOrPages;
  return (
    <PageLayout title="Projects">
      {posts.map((post) => {
        return <PostCard key={post.slug} post={post} category="projects" />;
      })}
    </PageLayout>
  );
};

// const getProjectPosts = async () => {
//   const posts = await getPosts({ author: 'projects' });

//   if (!posts) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { posts },
//     revalidate: 60,
//   };
// };

export default Projects;
