import Image from 'next/image';

import landingBG from '../../public/images/landing_background.png';
import AboutMe from '../components/LandingSections/AboutMe/AboutMe';
import Featured from '../components/LandingSections/Featured/Featured';
import Hero from '../components/LandingSections/Hero/Hero';
import NewsletterSub from '../components/LandingSections/NewsletterSub/NewsletterSub';
import Services from '../components/LandingSections/Services/Services';
import ghost from '../lib/services/ghost';

const getData = async () => {
  const content = await ghost.getLandingPosts();

  return { content };
};

const Home = async () => {
  const { content } = await getData();

  return (
    <div className="home_container">
      <Image
        src={landingBG}
        alt="Background of Landing Page"
        fill
        className="h-screen w-full object-cover object-center"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        priority
      />
      <main className="flex size-full grow flex-col bg-gray-900">
        <Hero hero={content.hero} />
        <Services content={content.services} />
        <AboutMe aboutMe={content.aboutMe} />
        <Featured />
        <NewsletterSub />
      </main>
    </div>
  );
};

export default Home;
