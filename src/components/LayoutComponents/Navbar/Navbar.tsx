'use-client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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

import useNav from '../../../hooks/useNav';
import Button from '../../Button/Button';
import { paddingX } from '../../layouts/consts';
import HamburgerMenu from './HamburgerMenu';

export const ChevronDown = ({
  fill,
  size,
  height,
  width,
  ...props
}: {
  fill?: string;
  size?: number;
  height?: number;
  width?: number;
}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

const NavbarContainer = cva(['flex h-20 w-full items-end justify-between pb-2', paddingX], {
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

const NavbarButtonStyles = cva('flex cursor-pointer items-center !opacity-100', {
  variants: {
    intent: {
      even: 'hover:drop-shadow-navbar-svg-0 hover:filter',
      odd: 'hover:drop-shadow-navbar-svg-1 hover:filter',
    },
  },
});
const NavbarButtonSvgStyles = cva('mr-1');

export interface INavbarProps extends VariantProps<typeof NavbarContainer> {}

interface IServicesDropdownProps {
  services: {
    title: string;
    slug: string;
    image: string;
    cardBody: string;
    svg: string;
    tagline: string;
  }[];
}

const ServicesDropdown = ({ services }: IServicesDropdownProps) => {
  const button = services.find((item) => item.title === 'Services.Services');
  const elements = services.filter((item) => item.title !== 'Services.Services');

  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = () => {
    setTimeout(() => setIsOpen(false), 20);
  };

  if (!button || !elements) return null;

  return (
    <Dropdown isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DropdownTrigger>
        <NavbarItem
          className={NavbarButtonStyles({ intent: 'even' })}
          onMouseOver={() => setIsOpen(true)}
          onMouseLeave={closeDropdown}
        >
          <Link href={`/pages/${button.slug}`} className="flex items-center text-gray-50">
            <Image src={button.svg} alt={button.slug} width={20} height={20} className={NavbarButtonSvgStyles()} />
            <p>{button.title.split('.')[1]}</p>
          </Link>
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="ACME features"
        className="w-[340px]"
        itemClasses={{
          base: 'gap-4',
        }}
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {elements.map((item) => (
          <DropdownItem
            as={Link}
            href={`/pages/${item.slug}`}
            key={item.title}
            description={item.tagline}
            startContent={<Image src={item.svg} alt={item.title} width={60} height={60} className="" />}
          >
            {item.title.split('.')[1]}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

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
          <Button intent="accent" src="/contact" text="Get in Touch" />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarBrand className={NavbarButtonStyles({ intent: 'odd' })}>
          <Link href="/">
            <Image src="/logo_white.svg" alt="abdullah faruk gönüllü" width={60} height={60} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden items-center gap-8 sm:flex">
        <ServicesDropdown services={data.services} />
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
