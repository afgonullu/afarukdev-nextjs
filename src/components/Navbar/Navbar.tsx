'use-client';

import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';

import useNav from '../../hooks/useNav';
import Button from '../Button/Button';
import { paddingX } from '../layouts/consts';

const NavbarContainer = cva(['flex justify-between w-full h-20 items-end pb-2', paddingX], {
  variants: {
    intent: {
      transparent: 'bg-transparent text-gray-50',
      primary: 'bg-gray-900 text-gray-50',
      light: 'bg-gray-50 text-gray-900',
    },
    marginBottom: {
      true: 'mb-32',
      false: '',
    },
    /// ... other variants
  },
});

const NavbarButtonStyles = cva('ml-8 flex items-center cursor-pointer', {
  variants: {
    intent: {
      even: 'hover:filter hover:drop-shadow-navbar-svg-0',
      odd: 'hover:filter hover:drop-shadow-navbar-svg-1',
    },
  },
});
const NavbarButtonSvgStyles = cva('mr-1');

export interface INavbarProps extends VariantProps<typeof NavbarContainer> {
  intent: 'transparent' | 'primary' | 'light';
  marginBottom: boolean | null;
}

const Navbar = ({ intent, marginBottom }: INavbarProps) => {
  const { data, isLoading } = useNav();

  console.log('navbar data', data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <header className={NavbarContainer({ intent, marginBottom })}>
      <Button intent="outline" src="/contact" text="Get in Touch" />
      <ul className="flex justify-between">
        {data.map((item, index) => (
          <li key={item.slug}>
            <Link href={`/${item.slug}`} className={NavbarButtonStyles({ intent: index % 2 ? 'even' : 'odd' })}>
              <Image src={item.svg} alt={item.slug} width={20} height={20} className={NavbarButtonSvgStyles()} />
              <p>{item.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Navbar;
