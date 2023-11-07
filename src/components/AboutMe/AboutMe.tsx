import { cva, VariantProps } from 'class-variance-authority';

import { ILandingContent } from '../../lib/services/ghost';
import LandingSection from '../layouts/LandingSection/LandingSection';

const AboutMeStyles = cva('w-full flex flex-col justify-start');

export interface IAboutMeProps extends VariantProps<typeof AboutMeStyles> {
  aboutMe: ILandingContent['aboutMe'];
}

const AboutMe = ({ aboutMe }: IAboutMeProps) => {
  return (
    <LandingSection background="light" title={aboutMe.title} image={aboutMe.image}>
      <div className={cva(['prose w-7/12 max-w-max'])()} dangerouslySetInnerHTML={{ __html: aboutMe.text ?? '' }} />
    </LandingSection>
  );
};

export default AboutMe;
