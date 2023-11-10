import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';

import landingBG from '../../../public/images/landing_background.png';
import type { ILandingContent } from '../../lib/services/ghost';
import cn from '../../utils/cn';
import Button from '../Button/Button';
import { paddingX } from '../layouts/consts';

const SvgBlob = () => (
  <svg className="absolute bottom-[-1px] fill-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path
      fillOpacity="1"
      d="M0,32L80,80C160,128,320,224,480,266.7C640,309,800,299,960,282.7C1120,267,1280,245,1360,234.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
    />
  </svg>
);

const heroStyles = {
  container: cva(['flex w-full justify-center xl:justify-end', paddingX]),
  hero: cva('flex flex-col'),
  greeting: cva('text-base font-sans text-shadow-hero-title-sm mb-0 text-gray-50'),
  title: cva('text-shadow-hero-title text-gray-50 whitespace-pre-wrap'),
  description: cva('text-gray-900 whitespace-pre-wrap'),
  ctaButtons: cva('flex justify-start items-center mt-2'),
};

export interface IHeroProps extends VariantProps<typeof heroStyles.hero> {
  hero: ILandingContent['hero'];
}

const Hero = ({ hero }: IHeroProps) => {
  return (
    <div>
      <div>
        <Image
          src={landingBG}
          alt="Background of Landing Page"
          fill
          className="-z-10 h-screen object-cover object-right-top"
        />
        <SvgBlob />
      </div>
      <div className={cn(heroStyles.container())} style={{ height: 'calc(100vh - 13rem)' }}>
        <div className={cn(heroStyles.hero())}>
          <h1 className={cn(heroStyles.greeting())}>{hero.greeting}</h1>
          <h2 className={cn(heroStyles.title())}>{hero.title}</h2>
          <p>
            <mark className={cn(heroStyles.description())}>{hero.text}</mark>
          </p>
          <div id="cta-buttons" className={cn(heroStyles.ctaButtons())}>
            <Button intent="primary" src="/resume" text="Learn More" />
            {/* <Button intent="accent" onClick={() => {}} text="Resume" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
