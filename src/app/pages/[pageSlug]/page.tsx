import { cva } from 'class-variance-authority';
import Image from 'next/image';

import { paddingX } from '../../../components/layouts/consts';
import { getPages, getSinglePage } from '../../../lib/services/ghost';

const Page = async ({ params }: { params: { pageSlug: string } }) => {
  const page = await getSinglePage(params.pageSlug);
  return (
    <div className="flex grow flex-col">
      <div className={cva(['relative flex items-end pb-4', paddingX])()} style={{ height: 'calc(60vh - 5rem)' }}>
        <Image
          src={page.feature_image || '/images/landing_background.png'}
          alt={page.feature_image_alt || page.title || 'Background of Landing Page'}
          fill
          className="h-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <h1 className="z-10 bg-gray-50/60 p-2">{page.title}</h1>
      </div>
      <div
        className={cva([paddingX])()}
        style={{ margin: '2rem' }}
        dangerouslySetInnerHTML={{ __html: page.html ?? '' }}
      />
    </div>
  );
};

export async function generateStaticParams() {
  const pages = await getPages();

  return pages.map((item) => ({
    pageSlug: item.slug,
  }));
}

export default Page;
