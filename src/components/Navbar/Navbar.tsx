'use-client';

import {
  Link as NextLink,
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
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import useNav from '../../hooks/useNav';
import Button from '../Button/Button';
import { paddingX } from '../layouts/consts';
import HamburgerMenu from './HamburgerMenu';

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
  const pathname = usePathname();
  const { data, isLoading } = useNav();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dynamicIntent, setDynamicIntent] = useState(intent);

  if (isLoading || data.length === 0) {
    return <div style={{ height: '5rem', width: '100%', marginBottom: pathname === '/' ? '8rem' : '0' }} />;
  }

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <NextNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={toggleMenu}
      classNames={{
        base: NavbarContainer({ intent: dynamicIntent, marginBottom }),
      }}
      maxWidth="full"
      isBlurred={false}
      disableScrollHandler={false}
      onScrollPositionChange={(position) => (position !== 0 ? setDynamicIntent('primary') : setDynamicIntent(intent))}
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
        <NavbarBrand>
          <NextLink href="/">
            <Image src="/logo_white.svg" alt="abdullah faruk gönüllü" width={60} height={60} />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden items-center gap-4 sm:flex">
        {data.map((item, index) => (
          <NavbarItem key={item.slug} className={NavbarButtonStyles({ intent: index % 2 ? 'even' : 'odd' })}>
            <NextLink href={`/${item.slug}`} className="flex items-center text-gray-50">
              <Image src={item.svg} alt={item.slug} width={20} height={20} className={NavbarButtonSvgStyles()} />
              <p>{item.title}</p>
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {data.map((item) => (
          <NavbarMenuItem key={item.slug}>
            <NextLink className="w-full text-gray-900" href={`/${item.slug}`} size="lg">
              {item.title}
            </NextLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextNavbar>
  );
};

export default Navbar;
