import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
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
      className="relative h-[360px] min-w-[280px] hover:scale-105  sm:max-w-xs md:max-w-sm lg:max-w-[280px]"
    >
      <Image src={service.image} alt={service.title} fill className="object-cover brightness-[30%]" />
      <CardHeader className="flex flex-col items-center text-lg font-bold text-gray-50">Explore →</CardHeader>
      <CardBody className="relative h-full text-center text-xs text-gray-50">{service.cardBody}</CardBody>
      <CardFooter className="z-10 flex flex-col items-center justify-center pb-8 text-center text-sm font-semibold text-gray-50">
        {service.title.split('.')[1]}
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
