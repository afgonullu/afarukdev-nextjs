import { cva } from 'class-variance-authority';
import Image from 'next/image';

import useNav from '../../hooks/useNav';
import Button from '../Button/Button';
import { paddingX } from '../layouts/consts';

const NavbarContainer = cva(['flex justify-between w-full text-gray-50 h-20 mb-32 items-end', paddingX], {
  variants: {
    // intent: {
    //   primary: 'bg-orange-700 text-gray-50',
    //   secondary: 'bg-secondary text-red-400',
    // },
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

const Navbar = () => {
  const { data, isLoading } = useNav();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={NavbarContainer()}>
      <Button intent="outline" onClick={() => {}} text="Get in Touch" />
      <ul className="flex justify-between">
        {data.map((item, index) => (
          <li key={item.slug} className={NavbarButtonStyles({ intent: index % 2 ? 'even' : 'odd' })}>
            <Image src={item.svg} alt={item.slug} width={20} height={20} className={NavbarButtonSvgStyles()} />
            <p>{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
