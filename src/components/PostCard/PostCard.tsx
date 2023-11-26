import { Button, Card, CardBody } from '@nextui-org/react';
import type { PostOrPage } from '@tryghost/content-api';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';

const PostCardStyles = cva('absolute z-10 flex h-full w-full flex-col items-center justify-between p-4');

export interface IPostCardProps extends VariantProps<typeof PostCardStyles> {
  post: PostOrPage;
  category: string;
}

const PostCard = ({ post, category }: IPostCardProps) => {
  return (
    <Link href={`/content/${category}/${post.slug}`} key={post.slug} className="mb-4 w-full p-2">
      <Card isBlurred className="max-w-2xl border-none bg-gray-50/50" shadow="sm">
        <CardBody>
          <div className="grid grid-cols-6 items-center justify-center gap-6 md:grid-cols-12 md:gap-4">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                src={post.feature_image || 'https://picsum.photos/id/287/250/300'}
                alt="Background"
                className="h-40 w-40 bg-center object-cover"
                width={300}
                height={300}
              />
            </div>

            <div className="col-span-6 flex h-full flex-col md:col-span-8">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0">
                  <h1 className="mt-2 text-large font-medium">{post.title}</h1>
                </div>
                <Button
                  isIconOnly
                  disableRipple
                  disabled
                  className="bg-primary-900 text-gray-900/60"
                  radius="full"
                  variant="ghost"
                >
                  <Image
                    alt="sss"
                    src={post.primary_author?.profile_image || 'https://picsum.photos/id/287/250/300'}
                    width="20"
                    height="20"
                  />
                </Button>
              </div>

              <div className="mt-3 flex flex-col gap-1">
                <p>{post.excerpt}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default PostCard;
