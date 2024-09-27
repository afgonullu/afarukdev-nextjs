'use client';

import { cva, VariantProps } from 'class-variance-authority';

import ContentCard from '../../ContentCard/ContentCard';
import LandingSection from '../../layouts/LandingSection/LandingSection';
import useFeatured from '../../../hooks/useFeatured';
import useNav from '../../../hooks/useNav';

const FeaturedStyles = cva('flex flex-wrap justify-center gap-8 py-4 md:px-4 2xl:px-0');

export interface IFeaturedProps extends VariantProps<typeof FeaturedStyles> {}

const Featured = () => {
  const { data } = useNav();
  return (
    <LandingSection titleColor="dark" title="Featured Posts" imagePosition={null} hasMargin>
      <div className={FeaturedStyles()}>
        {data.featuredPosts.map((post) => {
          return <ContentCard key={post.slug} post={post} />;
        })}
      </div>
    </LandingSection>
  );
};

export default Featured;
