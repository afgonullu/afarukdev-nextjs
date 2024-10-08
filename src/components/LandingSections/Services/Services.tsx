'use client';

import { cva, VariantProps } from 'class-variance-authority';

import useNav from '../../../hooks/useNav';
import { ILandingContent } from '../../../lib/services/ghost';
import LandingSection from '../../layouts/LandingSection/LandingSection';
import ServiceCard from '../../ServiceCard/ServiceCard';

const ServicesStyles = cva('flex w-full flex-col justify-start');

export interface IServicesProps extends VariantProps<typeof ServicesStyles> {
  content: ILandingContent['services'];
}

const Services = ({ content }: IServicesProps) => {
  const {
    data: { services },
  } = useNav();

  return (
    <LandingSection titleColor="dark" title={content.title} imagePosition={null} hasMargin>
      <div
        className={cva(['section_subtext max-w-max text-center text-2xl'])()}
        dangerouslySetInnerHTML={{ __html: content.text ?? '' }}
      />
      <div className="flex flex-wrap justify-center gap-4 py-4 md:px-4 2xl:px-16 3xl:px-0">
        {services
          .filter((s) => s.title !== 'Services.Expertise')
          .map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
      </div>
    </LandingSection>
  );
};

export default Services;
