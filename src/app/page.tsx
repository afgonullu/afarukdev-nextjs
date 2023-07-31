import Image from 'next/image';

import landingBG from '../../public/images/landing_background.png';
import AboutMe from '../components/AboutMe/AboutMe';
import Featured from '../components/Featured/Featured';
import Hero from '../components/Hero/Hero';
import ghost from '../lib/services/ghost';

const getData = async () => {
  const content = await ghost.getLandingPosts();
  const posts = await ghost.getPosts({ featured: true });

  return { content, posts };
};

const Home = async () => {
  const { content, posts } = await getData();

  return (
    <>
      <Image
        src={landingBG}
        alt="Background of Landing Page"
        fill
        className="-z-10 h-screen object-cover object-right-top"
      />
      <main className="flex h-full w-full flex-col">
        <Hero hero={content.hero} />
        <Featured posts={posts} />
        <AboutMe aboutMe={content.aboutMe} />
      </main>
    </>
  );
};

export default Home;
