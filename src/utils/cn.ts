import classNames from 'classnames';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  classGroups: {
    'text-shadow': ['text-shadow-hero-title', 'text-shadow-hero-title-sm'],
  },
});

const cn = (...args: classNames.ArgumentArray) => twMerge(classNames(args));

export default cn;
