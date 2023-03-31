import { cva, VariantProps } from 'class-variance-authority';

import type { ILandingContent } from '../../lib/services/ghost';

const heroStyles = {
  container: cva('flex w-full justify-end'),
  hero: cva('flex flex-col justify-end'),
  greeting: cva('text-base font-sans text-shadow-hero-title-sm mb-0 text-gray-50'),
  title: cva('text-shadow-hero-title text-gray-50 whitespace-pre-wrap'),
  description: cva('text-gray-900 whitespace-pre-wrap'),
};

export interface IHeroProps extends VariantProps<typeof heroStyles.hero> {
  hero: ILandingContent['hero'];
}

const Hero = ({ hero }: IHeroProps) => (
  <div className={heroStyles.container()}>
    <div className={heroStyles.hero()}>
      <h1 className={heroStyles.greeting()}>{hero.greeting}</h1>
      <h2 className={heroStyles.title()}>{hero.title}</h2>
      <p>
        <mark className={heroStyles.description()}>{hero.description}</mark>
      </p>
      {/* ADD THE CTA BUTTONS */}
    </div>
  </div>
);

export default Hero;
