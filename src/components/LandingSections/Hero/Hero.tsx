import { cva, VariantProps } from 'class-variance-authority';

import type { ILandingContent } from '../../../lib/services/ghost';
import cn from '../../../utils/cn';
import Button from '../../Button/Button';
import { paddingX } from '../../layouts/consts';

const heroStyles = {
  container: cva(['z-10 flex w-full justify-center xl:justify-end', paddingX]),
  hero: cva('flex flex-col'),
  greeting: cva('mb-0 font-sans text-base text-gray-900 text-shadow-hero-title-sm'),
  title: cva('whitespace-pre-wrap text-gray-900 text-shadow-hero-title'),
  description: cva('whitespace-pre-wrap text-gray-900'),
  ctaButtons: cva('mt-2 flex items-center justify-start'),
};

export interface IHeroProps extends VariantProps<typeof heroStyles.hero> {
  hero: ILandingContent['hero'];
}

const Hero = ({ hero }: IHeroProps) => {
  return (
    <div className={cn(heroStyles.container())} style={{ height: 'calc(100vh - 14rem)' }}>
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
  );
};

export default Hero;
