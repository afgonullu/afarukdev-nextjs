import AboutMe from '../components/LandingSections/AboutMe/AboutMe';
import Featured from '../components/LandingSections/Featured/Featured';
import Hero from '../components/LandingSections/Hero/Hero';
import Services from '../components/LandingSections/Services/Services';
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
      <Services content={content.services} />
    </main>
  );
};

export default Home;
