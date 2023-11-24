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
      shadow="sm"
      className="relative h-[360px] w-[320px] hover:scale-105"
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
      <CardBody className="flex items-end justify-start" />
      <CardFooter className="z-10 flex flex-col !items-start justify-start pb-8 text-sm font-semibold text-gray-50">
        <small className="text-xs font-semibold text-gray-50">{dayjs(post.published_at).format('DD/MM/YYYY')}</small>
        <p className="text-lg font-semibold text-gray-50">{post.title}</p>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
