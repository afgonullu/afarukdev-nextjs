import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

interface IServiceCardProps {
  service: {
    title: string;
    slug: string;
    image: string;
    cardBody: string;
    svg: string;
    tagline: string;
  };
}

const ServiceCard = ({ service }: IServiceCardProps) => {
  return (
    <Card
      as={Link}
      href={`/pages/${service.slug}`}
      key={service.slug}
      shadow="sm"
      className="relative h-[360px] min-w-[280px] hover:scale-105  sm:max-w-xs md:max-w-sm lg:max-w-[300px] 3xl:max-w-[280px]"
    >
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover brightness-[30%]"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <CardHeader className="flex flex-col items-center text-lg font-bold tracking-tighter text-gray-50">
        Explore {service.title.split('.')[1]} →
      </CardHeader>
      <CardBody className="relative flex h-full justify-end text-center text-xs text-gray-50">
        {service.cardBody}
      </CardBody>
    </Card>
  );
};

export default ServiceCard;
