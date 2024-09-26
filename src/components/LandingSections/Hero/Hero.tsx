import { cva, VariantProps } from 'class-variance-authority';

import Image from 'next/image';
import type { ILandingContent } from '../../../lib/services/ghost';
import cn from '../../../utils/cn';
import Button from '../../Button/Button';
import { paddingX } from '../../layouts/consts';
import nodejs from '../../../../public/images/svgs/nodedotjs.svg';
import react from '../../../../public/images/svgs/react.svg';
import nextjs from '../../../../public/images/svgs/nextdotjs.svg';
import typescript from '../../../../public/images/svgs/typescript.svg';
import langchain from '../../../../public/images/svgs/langchain.svg';

const heroStyles = {
  container: cva(['z-10 flex w-full justify-center xl:justify-end', paddingX]),
  hero: cva('flex flex-col'),
  greeting: cva('mb-0 flex gap-2 font-sans text-base text-gray-900 text-shadow-hero-title-sm'),
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
        <h1 className={cn(heroStyles.greeting())}>
          <Image src={nodejs} alt="Node.js" width={20} height={20} className="hidden md:block" />
          <p>Node.js |</p>
          <Image src={react} alt="React" width={20} height={20} className="hidden md:block" />
          <p>React |</p>
          <Image src={nextjs} alt="Next.js" width={20} height={20} className="hidden md:block" />
          <p>Next.js |</p>
          <Image src={typescript} alt="TypeScript" width={20} height={20} className="hidden md:block" />
          <p>TypeScript |</p>
          <Image src={langchain} alt="LangChain" width={20} height={20} className="hidden md:block" />
          <p>LangChain</p>
        </h1>
        <h2 className={cn(heroStyles.title())}>{hero.title}</h2>
        <p>
          <mark className={cn(heroStyles.description())}>{hero.text}</mark>
        </p>
        <div id="cta-buttons" className={cn(heroStyles.ctaButtons())}>
          <Button intent="primary" src="/contact" text="Get In Touch" />
          {/* <Button intent="primary" src="/pages/process" text="Learn More" /> */}
          {/* <Button intent="accent" src="/contact" text="Get in Touch" /> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
