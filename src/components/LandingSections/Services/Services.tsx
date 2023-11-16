'use client';

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';

import useNav from '../../../hooks/useNav';
import { ILandingContent } from '../../../lib/services/ghost';
import LandingSection from '../../layouts/LandingSection/LandingSection';

const ServicesStyles = cva('w-full flex flex-col justify-start');

export interface IServicesProps extends VariantProps<typeof ServicesStyles> {
  content: ILandingContent['services'];
}

const Services = ({ content }: IServicesProps) => {
  const {
    data: { services },
  } = useNav();

  return (
    <LandingSection background="light" title={content.title} imagePosition={null} hasPadding>
      <div
        className={cva(['prose max-w-max text-center text-gray-900'])()}
        dangerouslySetInnerHTML={{ __html: content.text ?? '' }}
      />
      <div className="grid grid-cols-10 gap-4 py-4">
        {services
          .filter((s) => s.title !== 'Services.Services')
          .map((service) => (
            <Card
              as={Link}
              href={`/pages/${service.slug}`}
              key={service.slug}
              shadow="sm"
              className="relative col-span-12 h-[360px] hover:scale-105 md:col-span-3 xl:col-span-2"
            >
              <Image src={service.image} alt={service.title} fill objectFit="cover" className="brightness-[30%]" />
              <CardHeader className="flex flex-col items-center text-lg font-bold text-gray-50">Explore →</CardHeader>
              <CardBody className="relative h-full text-center text-xs text-gray-50">{service.cardBody}</CardBody>
              <CardFooter className="z-10 flex flex-col items-center justify-center pb-8 text-center text-sm font-semibold text-gray-50">
                {service.title.split('.')[1]}
              </CardFooter>
            </Card>
          ))}
      </div>
    </LandingSection>
  );
};

export default Services;
