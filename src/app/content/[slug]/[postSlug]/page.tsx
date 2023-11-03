import { cva } from 'class-variance-authority';
import Image from 'next/image';

import { paddingX } from '../../../../components/layouts/consts';
import { getPosts, getSinglePost } from '../../../../lib/services/ghost';

const Project = async ({ params }: { params: { postSlug: string } }) => {
  const post = await getSinglePost(params.postSlug);
  return (
    <>
      <div className={cva(['relative flex items-end pb-4', paddingX])()} style={{ height: 'calc(60vh - 5rem)' }}>
        <Image
          src={post.feature_image || '/images/landing_background.png'}
          alt={post.feature_image_alt || post.title || 'Background of Landing Page'}
          fill
          className="-z-10 h-full object-cover"
        />
        <h1 className="bg-gray-50/60 p-2">{post.title}</h1>
      </div>
      <div
        className={cva(['prose m-2 max-w-none', paddingX])()}
        dangerouslySetInnerHTML={{ __html: post.html ?? '' }}
      />
    </>
  );
};

export async function generateStaticParams() {
  const posts = await getPosts({ featured: false });

  // Get the paths we want to create based on posts
  return posts.map((item) => ({
    postSlug: item.slug,
  }));
}

export default Project;
