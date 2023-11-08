import type { PostsOrPages } from '@tryghost/content-api';
import { cva, VariantProps } from 'class-variance-authority';

import FeaturedCard from '../FeaturedCard/FeaturedCard';
import LandingSection from '../layouts/LandingSection/LandingSection';

const FeaturedStyles = cva('max-w-full flex flex-wrap justify-center');

export interface IFeaturedProps extends VariantProps<typeof FeaturedStyles> {
  posts: PostsOrPages;
}

const Featured = ({ posts }: IFeaturedProps) => {
  return (
    <LandingSection background="dark" title="Featured Content" hasPadding imagePosition={null}>
      <div className={FeaturedStyles()}>
        {posts.map((post) => {
          return <FeaturedCard key={post.slug} post={post} />;
        })}
      </div>
    </LandingSection>
  );
};

export default Featured;
