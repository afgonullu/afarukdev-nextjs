import type { PostOrPage } from '@tryghost/content-api';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';

const FeaturedCardStyles = cva('absolute w-full h-full flex flex-col justify-between items-center p-4 z-10');

export interface IFeaturedCardProps extends VariantProps<typeof FeaturedCardStyles> {
  post: PostOrPage;
}

const FeaturedCard = ({ post }: IFeaturedCardProps) => {
  return (
    <div key={post.slug} className="p-2">
      <div className="group relative h-40 w-40 cursor-pointer overflow-hidden rounded-lg  from-primary-100">
        <Image
          src={post.feature_image || 'https://picsum.photos/id/287/250/300'} // TODO: replace placeholder with a dynamic random image
          alt="Background"
          className="h-full bg-center object-cover transition-transform duration-500 group-hover:scale-125"
          width={250}
          height={300}
        />
        <div className="absolute inset-x-0 bottom-0 flex h-full flex-col items-start justify-between from-primary-900/60 to-primary-900/60 p-4 font-sans text-4xl font-bold text-transparent group-hover:animate-reveal group-hover:bg-gradient-to-r group-hover:text-primary-50">
          <p>{post.title}</p>
          <Image
            alt="sss"
            src={post.primary_author?.profile_image || 'https://picsum.photos/id/287/250/300'}
            width="20"
            height="20"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;

// <figure className="relative h-48 w-48">
//   <Image
//     src="https://picsum.photos/id/287/250/300"
//     alt="Background of Landing Page"
//     fill
//     className="absolute z-0 transition-all hover:scale-125"
//   />
//   <div className={FeaturedCardStyles()}>
//     <figcaption className="hover:scale-150">Lorem, ipsum dolor</figcaption>
//     <Image src="https://blog.afaruk.dev/content/images/2023/04/lockpicks.svg" alt="alt" width={20} height={20} />
//   </div>
// </figure>
