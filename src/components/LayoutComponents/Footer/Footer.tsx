import { cva } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';

import useFooter from '../../../hooks/useFooter';
import useNav from '../../../hooks/useNav';

const FooterStyles = cva([
  'flex flex-col items-center justify-around gap-4 border-t-3 border-t-secondary bg-gray-900 px-5 pb-40 pt-8 text-center text-gray-50 lg:flex-row lg:items-start lg:text-start',
]);

const Footer = () => {
  const { data } = useFooter();
  const { data: navData, profileImage } = useNav();

  return (
    <footer className={FooterStyles()}>
      <div className="flex h-full max-w-sm flex-col items-center justify-between lg:items-start ">
        <div className="mb-4 flex w-48 grow justify-between gap-6">
          {data.map((item) => {
            return (
              <a key={item.title} href={item.link} target="_blank" rel="noreferrer">
                <Image src={item.svg} alt={item.text} width={40} height={40} className="fill-secondary hover:invert" />
              </a>
            );
          })}
        </div>
        <div className="flex flex-1 flex-col">
          <small className="text-secondary">© Copyright © 2023 Abdullah Faruk Gonullu</small>
          <small>
            Repository is publicly available. Check out the{' '}
            <a className="underline" target="_blank" href="https://bit.ly/3RfXi9t" rel="noreferrer">
              Github Repo
            </a>
            .
          </small>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h6 className="text-secondary">Explore</h6>
        <ul>
          {navData.latestPosts.map((item) => {
            return (
              <li key={item.slug}>
                <Link href={`/content/${item.author}/${item.slug}`}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-6">
        <h6 className="text-secondary">Sitemap</h6>
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
      {profileImage && (
        <Image
          src={profileImage}
          alt="Abdullah Faruk"
          width={200}
          height={200}
          className="hidden rounded-full border-2 border-secondary shadow-md lg:block"
        />
      )}
    </footer>
  );
};

export default Footer;
