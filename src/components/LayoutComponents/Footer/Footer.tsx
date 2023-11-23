import { cva } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';

import useFooter from '../../../hooks/useFooter';
import useNav from '../../../hooks/useNav';

const FooterStyles = cva([
  'flex flex-col lg:flex-row gap-4 items-center lg:items-start text-center lg:text-start justify-around py-8 bg-gray-900 text-gray-50',
]);

const Footer = () => {
  const { data } = useFooter();
  const { data: navData, profileImage } = useNav();

  return (
    <footer className={FooterStyles()}>
      <div className="flex max-w-sm flex-col items-center justify-between lg:items-start ">
        <div className="mb-4 flex w-52 justify-between gap-2">
          {data.map((item) => {
            return (
              <a key={item.title} href={item.link} target="_blank" rel="noreferrer">
                <Image src={item.svg} alt={item.text} width={40} height={40} className="hover:invert" />
              </a>
            );
          })}
        </div>
        <small>©2023 A Faruk Gonullu.</small>
        <small>
          Built with ❤️ and also with Next.js hosted on Vercel, Ghost CMS hosted on Digital Ocean. Check out the{' '}
          <a href="https://github.com/afgonullu/afarukdev-nextjs/">Github Repo</a>.
        </small>
      </div>
      <div className="flex-col">
        <h6>Explore</h6>
        <ul>
          {navData.services
            .filter((s) => s.title !== 'Services.Services')
            .map((item) => {
              return (
                <li key={item.slug}>
                  <Link href={`/pages/${item.slug}`}>{item.title?.split('.')[1]}</Link>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="flex flex-col">
        <h6>Sitemap</h6>
        <ul>
          {navData.authors.map((item) => {
            return (
              <li key={item.slug}>
                <Link href={`/content/${item.slug}`}>{item.title}</Link>
              </li>
            );
          })}
          {navData.pages.map((item) => {
            return (
              <li key={item.slug}>
                <Link href={`/pages/${item.slug}`}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Image
        src={profileImage}
        alt="Abdullah Faruk"
        width={200}
        height={200}
        className="hidden rounded-full lg:block"
      />
    </footer>
  );
};

export default Footer;
