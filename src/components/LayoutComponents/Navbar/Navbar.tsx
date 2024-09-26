'use-client';

import { Navbar as NextNavbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarItem } from '@nextui-org/react';
import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

import Image from 'next/image';
import useNav from '../../../hooks/useNav';
import { paddingX } from '../../layouts/consts';
import HamburgerMenu from './HamburgerMenu';

const NavbarContainer = cva(['flex h-max w-full items-start justify-center pb-2', paddingX], {
  variants: {
    intent: {
      transparent: 'bg-transparent text-gray-50',
      primary: 'border-b-2 border-b-secondary bg-gray-900 text-gray-50',
      light: 'bg-gray-50/60 text-gray-900',
    },
    marginBottom: {
      true: 'mb-32',
      false: '',
    },
    /// ... other variants
  },
});

const NavbarButtonStyles = cva('flex cursor-pointer items-center justify-center !opacity-100', {
  variants: {
    intent: {
      even: 'hover:drop-shadow-navbar-svg-0 hover:filter',
      odd: 'hover:drop-shadow-navbar-svg-1 hover:filter',
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

  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 200],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 26, 51, 1)'] // Adjust colors as needed
  );
  const borderBottom = useTransform(
    scrollY,
    [0, 200],
    ['0px solid rgba(0, 0, 0, 0)', '2px solid rgba(0, 204, 153, 1)'] // Adjust colors as needed
  );

  useEffect(() => {
    setDynamicIntent(pathname === '/' && scrollTop === 0 ? 'transparent' : 'primary');
  }, [pathname, scrollTop]);

  if (isLoading || data.authors.length === 0 || data.pages.length === 0) {
    return <div style={{ height: '5rem', width: '100%', marginBottom: pathname === '/' ? '8rem' : '0' }} />;
  }

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <motion.div
      style={{
        backgroundColor: pathname === '/' ? backgroundColor : 'rgba(0, 0, 0, 0)',
        borderBottom,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        marginBottom: pathname === '/' ? '8rem' : '0',
      }}
    >
      <NextNavbar
        height="auto"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={toggleMenu}
        classNames={{
          base: NavbarContainer({ intent: dynamicIntent, marginBottom: false }),
          wrapper: 'flex flex-col justify-center',
        }}
        maxWidth="full"
        isBlurred={false}
        disableScrollHandler={false}
        onScrollPositionChange={(position) => setScrollTop(position)}
      >
        <NavbarContent className="block sm:hidden" justify="start">
          <NavbarMenuToggle icon={<HamburgerMenu />} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
        </NavbarContent>
        {/* <NavbarContent justify="start">
        <NavbarItem className="hidden md:flex">
          <Button intent="accent" src="/contact" text="Get in Touch" />
        </NavbarItem>
      </NavbarContent> */}

        <NavbarContent justify="center" className="border-t-8 border-gray-50 pt-4">
          <NavbarBrand className={NavbarButtonStyles({ intent: 'odd' })}>
            <Link href="/">
              {/* <Image src="/logo_white.svg" alt="abdullah faruk gönüllü" width={60} height={60} /> */}
              <p className="text-7xl font-bold text-gray-50">devAF</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end" className="hidden items-center gap-8 sm:flex">
          {/* <ServicesDropdown services={data.services} /> */}
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

        {/* <NavbarMenu>
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
      </NavbarMenu> */}
      </NextNavbar>
    </motion.div>
  );
};

export default Navbar;
