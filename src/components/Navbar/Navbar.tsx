'use-client';

import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import useNav from '../../hooks/useNav';
import Button from '../Button/Button';
import { paddingX } from '../layouts/consts';
import HamburgerMenu from './HamburgerMenu';

const NavbarContainer = cva(['flex justify-between w-full h-20 items-end pb-2', paddingX], {
  variants: {
    intent: {
      transparent: 'bg-transparent text-gray-50',
      primary: 'bg-gray-900 text-gray-50',
      light: 'bg-gray-50/60 text-gray-900',
    },
    marginBottom: {
      true: 'mb-32',
      false: '',
    },
    /// ... other variants
  },
});

const NavbarButtonStyles = cva('flex items-center cursor-pointer', {
  variants: {
    intent: {
      even: 'hover:filter hover:drop-shadow-navbar-svg-0',
      odd: 'hover:filter hover:drop-shadow-navbar-svg-1',
    },
  },
});
const NavbarButtonSvgStyles = cva('mr-1');

export interface INavbarProps extends VariantProps<typeof NavbarContainer> {}

const Navbar = () => {
  const pathname = usePathname();
  const { data, isLoading } = useNav();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [dynamicIntent, setDynamicIntent] = useState<'transparent' | 'primary' | 'light'>(
    pathname === '/' ? 'transparent' : 'primary'
  );

  useEffect(() => {
    setDynamicIntent(pathname === '/' && scrollTop === 0 ? 'transparent' : 'primary');
  }, [pathname, scrollTop]);

  if (isLoading || data.authors.length === 0 || data.pages.length === 0) {
    return <div style={{ height: '5rem', width: '100%', marginBottom: pathname === '/' ? '8rem' : '0' }} />;
  }

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <NextNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={toggleMenu}
      classNames={{
        base: NavbarContainer({ intent: dynamicIntent, marginBottom: pathname === '/' }),
      }}
      maxWidth="full"
      isBlurred={false}
      disableScrollHandler={false}
      onScrollPositionChange={(position) => setScrollTop(position)}
    >
      <NavbarContent className="block sm:hidden" justify="start">
        <NavbarMenuToggle icon={<HamburgerMenu />} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>
      <NavbarContent justify="start">
        <NavbarItem className="hidden md:flex">
          <Button intent="outline" src="/contact" text="Get in Touch" />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarBrand className={NavbarButtonStyles({ intent: 'even' })}>
          <Link href="/">
            <Image src="/logo_white.svg" alt="abdullah faruk gönüllü" width={60} height={60} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden items-center gap-8 sm:flex">
        {data.authors.map((item, index) => (
          <NavbarItem key={item.slug} className={NavbarButtonStyles({ intent: index % 2 ? 'even' : 'odd' })}>
            <Link href={`/content/${item.slug}`} className="flex items-center text-gray-50">
              <Image src={item.svg} alt={item.slug} width={20} height={20} className={NavbarButtonSvgStyles()} />
              <p>{item.title}</p>
            </Link>
          </NavbarItem>
        ))}
        {data.pages.map((item, index) => (
          <NavbarItem key={item.slug} className={NavbarButtonStyles({ intent: index % 2 ? 'even' : 'odd' })}>
            <Link href={`/pages/${item.slug}`} className="flex items-center text-gray-50">
              <Image src={item.svg} alt={item.slug} width={20} height={20} className={NavbarButtonSvgStyles()} />
              <p>{item.title}</p>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {data.authors.map((item) => (
          <NavbarMenuItem key={item.slug}>
            <Link className="w-full text-gray-900" href={`/${item.slug}`}>
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
        {data.pages.map((item) => (
          <NavbarMenuItem key={item.slug}>
            <Link className="w-full text-gray-900" href={`/${item.slug}`}>
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextNavbar>
  );
};

export default Navbar;
