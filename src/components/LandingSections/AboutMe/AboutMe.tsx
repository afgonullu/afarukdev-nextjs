import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';

import { ILandingContent } from '../../../lib/services/ghost';
import LandingSection from '../../layouts/LandingSection/LandingSection';

const AboutMeStyles = cva('flex w-full flex-col justify-start');

export interface IAboutMeProps extends VariantProps<typeof AboutMeStyles> {
  aboutMe: ILandingContent['aboutMe'];
}

const AboutMe = ({ aboutMe }: IAboutMeProps) => {
  return (
    <LandingSection titleColor="light" title={aboutMe.title} image={aboutMe.image} imagePosition="left" hasBorder>
      <div
        className={cva(['section_subtext max-w-max px-4 text-2xl text-gray-900'])()}
        dangerouslySetInnerHTML={{ __html: aboutMe.text ?? '' }}
      />
      <Link className="section_subtext max-w-max px-4 text-gray-900" href="/pages/about-me">
        Learn More →
      </Link>
    </LandingSection>
  );
};

export default AboutMe;
