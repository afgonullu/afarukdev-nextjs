import { Card, CardBody } from '@nextui-org/react';
import Image from 'next/image';

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
    <Card key={service.slug} className="max-w-48 bg-transparent text-gray-50 shadow-none hover:scale-105">
      <CardBody className="flex flex-col items-center justify-center gap-4 px-6">
        <Image src={service.svg} alt={service.title} width={60} height={60} />
        <p className="text-center">{service.title.split('.')[1]}</p>
      </CardBody>
    </Card>
  );
};

export default ServiceCard;
