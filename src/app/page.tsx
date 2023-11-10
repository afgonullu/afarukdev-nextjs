import AboutMe from '../components/AboutMe/AboutMe';
import Featured from '../components/Featured/Featured';
import Hero from '../components/Hero/Hero';
import NewsletterSub from '../components/NewsletterSub/NewsletterSub';
import ghost from '../lib/services/ghost';

const getData = async () => {
  const content = await ghost.getLandingPosts();
  const posts = await ghost.getPosts({ featured: true });

  return { content, posts };
};

const Home = async () => {
  const { content, posts } = await getData();

  return (
    <main className="flex h-full w-full grow flex-col">
      <Hero hero={content.hero} />
      <Featured posts={posts} />
      <NewsletterSub />
      <AboutMe aboutMe={content.aboutMe} />
    </main>
  );
};

export default Home;
