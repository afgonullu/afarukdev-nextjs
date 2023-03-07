import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

const cn = (...args: classNames.ArgumentArray) => twMerge(classNames(args));

export default cn;
