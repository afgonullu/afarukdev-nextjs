import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { PostOrPage } from '@tryghost/content-api';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

interface IContentCardProps {
  post: PostOrPage;
}

const ContentCard = ({ post }: IContentCardProps) => {
  return (
    <Card
      as={Link}
      href={`/content/${post.primary_author?.slug}/${post.slug}`}
      key={post.slug}
      className="relative h-[360px] w-[320px] bg-transparent hover:scale-105 hover:bg-transparent"
      isFooterBlurred
    >
      <Image
        src={post.feature_image ?? ''}
        alt={post.title ?? ''}
        fill
        className="object-cover grayscale backdrop-blur-sm"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <CardBody className="flex items-end justify-start" />
      <CardFooter className="absolute bottom-0 z-10 flex flex-col !items-start justify-start bg-gray-900/40  text-sm font-semibold text-gray-50">
        <small className="text-xs font-semibold text-gray-50">{dayjs(post.published_at).format('DD/MM/YYYY')}</small>
        <p className="text-lg font-semibold text-gray-50">{post.title}</p>
        <Image
          alt="sss"
          src={post.primary_author?.profile_image || 'https://picsum.photos/id/287/250/300'}
          width="20"
          height="20"
          className="absolute bottom-3 right-3"
        />
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
