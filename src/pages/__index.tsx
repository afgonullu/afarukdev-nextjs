import type { PostsOrPages } from '@tryghost/content-api';
import Head from 'next/head';
import Image from 'next/image';

import landingBG from '../../public/images/landing_background.png';
import Featured from '../components/Featured/Featured';
import Hero from '../components/Hero/Hero';
import ghost, { ILandingContent } from '../lib/services/ghost';

interface IHomeProps {
  content: ILandingContent;
  posts: PostsOrPages;
}

const Home = ({ content, posts }: IHomeProps) => {
  const { hero } = content;
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Image
          src={landingBG}
          alt="Background of Landing Page"
          fill
          className="-z-10 h-screen object-cover object-right-top"
        />
        <main className="flex h-full w-full flex-col">
          <Hero hero={hero} />
          <Featured posts={posts} />
        </main>
      </>
    </>
  );
};

export const getStaticProps = async () => {
  const content = await ghost.getLandingPosts();
  const posts = await ghost.getPosts({ featured: true });

  return {
    props: {
      content,
      posts,
    },
  };
};

export default Home;