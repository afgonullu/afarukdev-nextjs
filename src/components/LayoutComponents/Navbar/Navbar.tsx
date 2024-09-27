'use-client';

import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

import Image from 'next/image';
import useNav from '../../../hooks/useNav';
import { paddingX } from '../../layouts/consts';
import HamburgerMenu from './HamburgerMenu';

const NavbarContainer = cva(['flex h-max w-full items-start justify-center pb-2', paddingX], {
  variants: {},
});

const NavbarButtonStyles = cva('cursor-pointer !opacity-100', {
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

  const { scrollY } = useScroll();
  const textColor = useTransform(scrollY, [0, 100], ['rgba(0, 26, 51, 1)', 'rgba(250, 253, 252, 1)']);
  const backgroundColor = useTransform(scrollY, [0, 200], ['rgba(0, 0, 0, 0)', 'rgba(0, 26, 51, 1)']);
  const borderBottom = useTransform(
    scrollY,
    [0, 200],
    ['0px solid rgba(0, 0, 0, 0)', '2px solid rgba(0, 204, 153, 1)']
  );
  const brandingSize = useTransform(scrollY, [0, 200], ['4.5rem', '2rem']);
  const height = useTransform(scrollY, [0, 200], ['10rem', '5rem']);

  if (isLoading || data.authors.length === 0 || data.pages.length === 0) {
    return <div style={{ height: '5rem', width: '100%', marginBottom: pathname === '/' ? '8rem' : '0' }} />;
  }

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <NextNavbar
      as={motion.div}
      style={{
        backgroundColor: pathname === '/' ? (backgroundColor as any) : 'rgba(0, 26, 51, 1)',
        borderBottom: borderBottom as any,
        position: 'sticky',
        top: 0,
        marginBottom: pathname === '/' ? '8rem' : '0',
        zIndex: 40,
        color: pathname === '/' ? (textColor as any) : 'rgba(250, 253, 252, 1)',
        gap: 0,
      }}
      height={height as any}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={toggleMenu}
      classNames={{
        base: NavbarContainer(),
        wrapper: 'flex sm:flex-col justify-center',
      }}
      maxWidth="full"
      isBlurred={false}
      disableScrollHandler={false}
    >
      <NavbarContent className="block sm:hidden" justify="start">
        <NavbarMenuToggle icon={<HamburgerMenu />} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>
      {/* <NavbarContent justify="start">
        <NavbarItem className="hidden md:flex">
          <Button intent="accent" src="/contact" text="Get in Touch" />
        </NavbarItem>
      </NavbarContent> */}

      <NavbarContent
        as={motion.div}
        style={{
          color: pathname === '/' ? (textColor as any) : 'rgba(250, 253, 252, 1)',
          borderColor: pathname === '/' ? (textColor as any) : 'rgba(250, 253, 252, 1)',
        }}
        justify="center"
        className="border-t-8"
      >
        <NavbarBrand className={NavbarButtonStyles({ intent: 'odd' })}>
          <Link href="/">
            {/* <Image src="/logo_white.svg" alt="abdullah faruk gönüllü" width={60} height={60} /> */}
            <motion.p className="font-bold" style={{ fontSize: brandingSize }}>
              devAF
            </motion.p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden items-center gap-8 sm:flex">
        {/* <ServicesDropdown services={data.services} /> */}
        {data.authors.map((item, index) => (
          <NavbarItem key={item.slug} className={NavbarButtonStyles({ intent: index % 2 ? 'even' : 'odd' })}>
            <Link href={`/content/${item.slug}`} className="flex items-center text-gray-50">
              <Image src={item.svg} alt={item.slug} width={20} height={20} className={NavbarButtonSvgStyles()} />
              <motion.p style={{ color: pathname === '/' ? (textColor as any) : 'rgba(250, 253, 252, 1)' }}>
                {item.title}
              </motion.p>
            </Link>
          </NavbarItem>
        ))}
        {data.pages.map((item, index) => (
          <NavbarItem key={item.slug} className={NavbarButtonStyles({ intent: index % 2 ? 'even' : 'odd' })}>
            <Link href={`/pages/${item.slug}`} className="flex items-center text-gray-50">
              <Image src={item.svg} alt={item.slug} width={20} height={20} className={NavbarButtonSvgStyles()} />
              <motion.p style={{ color: pathname === '/' ? (textColor as any) : 'rgba(250, 253, 252, 1)' }}>
                {item.title}
              </motion.p>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu className="z-50 px-0">
        {data.authors.map((item) => (
          <NavbarMenuItem key={item.slug} className="flex justify-start gap-2 p-4 hover:bg-gray-900/20">
            <Image src={item.svg} alt={item.slug} width={20} height={20} className={NavbarButtonSvgStyles()} />
            <Link className="w-full text-gray-900" href={`/content/${item.slug}`}>
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
        {data.pages.map((item) => (
          <NavbarMenuItem key={item.slug} className="flex justify-start gap-2 p-4 hover:bg-gray-900/20">
            <Image src={item.svg} alt={item.slug} width={20} height={20} className={NavbarButtonSvgStyles()} />
            <Link className="w-full text-gray-900" href={`/pages/${item.slug}`}>
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextNavbar>
  );
};

export default Navbar;
