import { cva } from 'class-variance-authority';
import Image from 'next/image';

import { paddingX } from '../../../../components/layouts/consts';
import { getPosts, getSinglePost } from '../../../../lib/services/ghost';

const Post = async ({ params }: { params: { postSlug: string } }) => {
  const post = await getSinglePost(params.postSlug);
  return (
    <div className="flex grow flex-col">
      <div className={cva(['relative flex items-end pb-4', paddingX])()} style={{ height: 'calc(60vh - 5rem)' }}>
        <Image
          src={post.feature_image || '/images/landing_background.png'}
          alt={post.feature_image_alt || post.title || 'Background of Landing Page'}
          fill
          className="h-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <h1 className="z-10 bg-gray-50/60 p-2">{post.title}</h1>
      </div>
      <div
        className={cva(['max-w-4xl', paddingX])()}
        style={{ margin: '2rem' }}
        dangerouslySetInnerHTML={{ __html: post.html ?? '' }}
      />
    </div>
  );
};

export async function generateStaticParams() {
  const posts = await getPosts({ featured: false });

  return posts.map((item) => ({
    postSlug: item.slug,
  }));
}

export default Post;
