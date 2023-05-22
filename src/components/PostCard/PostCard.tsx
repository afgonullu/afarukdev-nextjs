import type { PostOrPage } from '@tryghost/content-api';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';

const PostCardStyles = cva('absolute w-full h-full flex flex-col justify-between items-center p-4 z-10');

export interface IPostCardProps extends VariantProps<typeof PostCardStyles> {
  post: PostOrPage;
  category: string;
}

const PostCard = ({ post, category }: IPostCardProps) => {
  return (
    <Link href={`/${category}/${post.slug}`} key={post.slug} className="w-full p-2">
      <div className="group flex cursor-pointer justify-start overflow-hidden rounded-lg from-primary-100">
        <Image
          src={post.feature_image || 'https://picsum.photos/id/287/250/300'} // TODO: replace placeholder with a dynamic random image
          alt="Background"
          className="h-40 w-40 bg-center object-cover"
          width={250}
          height={300}
        />
        <div className="flex w-full flex-col items-start justify-start from-primary-900/60 to-primary-900/60 p-4 font-sans text-4xl font-bold group-hover:animate-reveal group-hover:bg-gradient-to-r group-hover:text-primary-50">
          <Image
            className="mb-2"
            alt="sss"
            src={post.primary_author?.profile_image || 'https://picsum.photos/id/287/250/300'}
            width="20"
            height="20"
          />
          <p>{post.title}</p>
          <small>{post.excerpt}</small>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
