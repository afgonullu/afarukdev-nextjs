import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { PostOrPage } from '@tryghost/content-api';
import Image from 'next/image';
import Link from 'next/link';

interface IContentCardProps {
  post: PostOrPage;
}

const ContentCard = ({ post }: IContentCardProps) => {
  console.log({ post });
  return (
    <Card
      as={Link}
      href={`/content/${post.primary_author?.slug}/${post.slug}`}
      key={post.slug}
      shadow="sm"
      className="relative h-[360px] min-w-[280px] hover:scale-105  sm:max-w-xs md:max-w-sm lg:max-w-[280px]"
    >
      <Image src={post.feature_image ?? ''} alt={post.title ?? ''} fill className="object-cover brightness-[35%]" />
      <CardHeader className="flex justify-end text-lg font-bold text-gray-50">
        <Image
          alt="sss"
          src={post.primary_author?.profile_image || 'https://picsum.photos/id/287/250/300'}
          width="20"
          height="20"
        />
      </CardHeader>
      <CardBody className="relative h-full text-center text-xs text-gray-50">{post.excerpt}</CardBody>
      <CardFooter className="z-10 flex flex-col items-center justify-center pb-8 text-center text-sm font-semibold text-gray-50">
        {post.title}
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
