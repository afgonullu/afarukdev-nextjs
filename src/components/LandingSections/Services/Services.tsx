'use client';

import { cva, VariantProps } from 'class-variance-authority';

import useNav from '../../../hooks/useNav';
import { ILandingContent } from '../../../lib/services/ghost';
import LandingSection from '../../layouts/LandingSection/LandingSection';
import ContentCard from '../../ServiceCard/ServiceCard';

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
        className={cva(['section_subtext max-w-max text-center text-2xl text-gray-900'])()}
        dangerouslySetInnerHTML={{ __html: content.text ?? '' }}
      />
      <div className="flex flex-wrap justify-center gap-4 py-4 md:px-4 2xl:px-16 3xl:px-0">
        {services
          .filter((s) => s.title !== 'Services.Services')
          .map((service) => (
            <ContentCard key={service.slug} service={service} />
          ))}
      </div>
    </LandingSection>
  );
};

export default Services;
