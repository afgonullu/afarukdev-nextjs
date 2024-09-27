import { Card, CardFooter, CardHeader } from '@nextui-org/react';
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
      className="relative h-[360px] min-w-[280px] bg-transparent hover:scale-105 hover:bg-transparent sm:max-w-xs md:max-w-sm lg:max-w-[300px] 3xl:max-w-[280px]"
    >
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover brightness-50 grayscale backdrop-blur-[2px]"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <CardHeader className="flex flex-col items-center bg-primary/40 text-lg font-bold tracking-tighter text-gray-50">
        <div className="w-full">
          <p>{service.title.split('.')[1]}</p>
        </div>
      </CardHeader>
      <CardFooter className="absolute bottom-0 flex h-full items-end justify-end bg-gray-900/40 text-center text-xs text-gray-50">
        {service.cardBody}
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
