import type { PostsOrPages } from '@tryghost/content-api';
import { cva, VariantProps } from 'class-variance-authority';

import ContentCard from '../../ContentCard/ContentCard';
import LandingSection from '../../layouts/LandingSection/LandingSection';

const FeaturedStyles = cva('flex flex-wrap justify-center gap-8 py-4 md:px-4 2xl:px-0');

export interface IFeaturedProps extends VariantProps<typeof FeaturedStyles> {
  posts: PostsOrPages;
}

const Featured = ({ posts }: IFeaturedProps) => {
  return (
    <LandingSection titleColor="dark" title="Featured Articles" imagePosition={null} hasMargin>
      <p className="mb-4 text-center text-2xl text-gray-50">
        I imagine, contemplate, engineer, document and share. I create.
      </p>
      <div className={FeaturedStyles()}>
        {posts.map((post) => {
          return <ContentCard key={post.slug} post={post} />;
        })}
      </div>
    </LandingSection>
  );
};

export default Featured;
