import { cva } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';

import useFooter from '../../hooks/useFooter';
import useNav from '../../hooks/useNav';
import { paddingX } from '../layouts/consts';

const FooterStyles = cva(['flex flex-col bg-secondary text-gray-50']);
const FooterNavStyles = cva(['grid grid-cols-5 gap-4 py-4', paddingX]);
const CopyStyles = cva(['flex flex-col justify-center bg-primary-900 text-primary-50', paddingX]);

const Footer = () => {
  const { data } = useFooter();
  const { data: navData, profileImage } = useNav();

  return (
    <footer className={FooterStyles()}>
      <div className={FooterNavStyles()}>
        <div className="col-span-3">
          <h6>Social Places</h6>
          <small>
            These are some of the places you can find and follow me on the internet. You can also email me, if you
            prefer. Nevertheless, I will try to reply as soon as I can.
          </small>
          <div className="flex w-52 justify-between">
            {data.map((item) => {
              return (
                <a key={item.title} className="p-2" href={item.link} target="_blank" rel="noreferrer">
                  <Image src={item.svg} alt={item.text} width={40} height={40} className="hover:invert" />
                </a>
              );
            })}
          </div>
        </div>
        <div className="col-span-1 flex flex-col">
          <h6>Sitemap</h6>
          <ul>
            {navData.authors.map((item) => {
              return (
                <li key={item.slug}>
                  <Link href={`/${item.slug}`}>{item.title}</Link>
                </li>
              );
            })}
            {navData.pages.map((item) => {
              return (
                <li key={item.slug}>
                  <Link href={`/${item.slug}`}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Image src={profileImage} alt="Abdullah Faruk" width={200} height={200} className="col-span-1 rounded-full" />
      </div>
      <div className={CopyStyles()}>
        <small>©2023 A Faruk Gonullu.</small>
        <small>
          Built with ❤️ and also with Next.js hosted on Vercel, Ghost CMS hosted on Digital Ocean. Check out the{' '}
          <a href="https://github.com/afgonullu/afarukdev-nextjs/">Github Repo</a>.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
