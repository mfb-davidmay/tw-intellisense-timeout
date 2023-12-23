import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { DefaultMfbBrandVariants } from '../../models';
import styles from './styles.module.css';

const buttonStyles = tv({
  base: 'tw-inline-flex tw-items-center tw-rounded-lg tw-font-medium tw-active:opacity-80 tw-border tw-m-[2px] focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-offset-1 active:tw-ring-1 active:tw-ring-offset-1',
  variants: {
    brand: {
      ...DefaultMfbBrandVariants,
    },
    color: {
      primary: '',
      outline: '',
    },
    size: {
      sm: 'tw-px-3 tw-py-3 tw-text-xs tw-',
      md: 'tw-px-3.5 tw-py-3 tw-text-sm',
      lg: 'tw-px-4 tw-py-3 tw-text-base',
    },
    disabled: {
      true: 'disabled:tw-pointer-events-none',
    },
  },
  compoundVariants: [
    {
      brand: 'mfb',
      color: 'primary',
      class:
        'tw-bg-mfb-brand-500 tw-text-mfb-neutral-100 tw-border-transparent hover:tw-bg-mfb-brand-600 focus-visible:tw-ring-mfb-brand-500 active:tw-bg-mfb-brand-600 active:tw-ring-mfb-brand-600',
    },
    {
      brand: 'mfb',
      color: 'primary',
      disabled: true,
      class: 'disabled:tw-bg-mfb-brand-100 disabled:tw-text-mfb-brand-300',
    },
    {
      brand: 'mfb',
      color: 'outline',
      class:
        'tw-bg-transparent tw-text-mfb-brand-600 tw-border-mfb-brand-600 hover:tw-bg-mfb-brand-100 hover:tw-text-mfb-brand-800 hover:tw-border-mfb-brand-800 focus-visible:tw-ring-mfb-brand-600 active:tw-bg-mfb-brand-100 active:tw-ring-mfb-brand-800 active:tw-text-mfb-brand-800 active:tw-border-mfb-brand-800',
    },
    {
      brand: 'mfb',
      color: 'outline',
      disabled: true,
      class: 'disabled:tw-text-mfb-brand-300 disabled:tw-border-mfb-brand-300',
    },
    {
      brand: 'fs',
      color: 'primary',
      class:
        'tw-bg-fs-brand-500 tw-text-fs-brand-900 tw-border-transparent hover:tw-bg-fs-brand-600 hover:tw-text-fs-neutral-100 focus-visible:tw-ring-fs-brand-500 active:tw-bg-fs-brand-600 active:tw-ring-fs-brand-600 active:tw-text-fs-neutral-100',
    },
    {
      brand: 'fs',
      color: 'primary',
      disabled: true,
      class: 'disabled:tw-bg-fs-brand-100 disabled:tw-text-fs-brand-300',
    },
    {
      brand: 'fs',
      color: 'outline',
      class:
        'tw-bg-transparent tw-text-fs-brand-700 tw-border-fs-brand-700 hover:tw-bg-fs-brand-100 hover:tw-text-fs-brand-700 focus-visible:tw-ring-fs-brand-600 active:tw-bg-fs-brand-100 active:tw-ring-fs-brand-800 active:tw-text-fs-brand-800 active:tw-border-fs-brand-800',
    },
    {
      brand: 'fs',
      color: 'outline',
      disabled: true,
      class: 'disabled:tw-text-fs-brand-300 disabled:tw-border-fs-brand-300',
    },
    {
      brand: 'bb',
      color: 'primary',
      class:
        'tw-bg-bb-brand-500 tw-text-bb-brand-900 tw-border-transparent hover:tw-bg-bb-brand-600 hover:tw-text-bb-brand-900 focus-visible:tw-ring-bb-brand-500 active:tw-bg-bb-brand-600 active:tw-ring-bb-brand-600',
    },
    {
      brand: 'bb',
      color: 'primary',
      disabled: true,
      class: 'disabled:tw-bg-bb-brand-100 disabled:tw-text-bb-brand-300',
    },
    {
      brand: 'bb',
      color: 'outline',
      class:
        'tw-bg-transparent tw-text-bb-brand-700 tw-border-bb-brand-700 hover:tw-bg-bb-brand-100 hover:tw-text-bb-brand-700 focus-visible:tw-ring-bb-brand-700 active:tw-bg-bb-brand-100 active:tw-ring-bb-brand-800 active:tw-text-bb-brand-800 active:tw-border-bb-brand-800',
    },
    {
      brand: 'bb',
      color: 'outline',
      disabled: true,
      class: 'disabled:tw-text-bb-brand-300 disabled:tw-border-bb-brand-300',
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
    brand: 'mfb',
  },
});

// #region FixtureHelperTypes
export type ButtonStyleInfo = (typeof buttonStyles)['variants'];
export type ButtonSizeInfo = keyof ButtonStyleInfo['size'];
export type ButtonColorInfo = keyof ButtonStyleInfo['color'];
export type ButtonBrandInfo = keyof ButtonStyleInfo['brand'];

export const ButtonColors: ButtonColorInfo[] = ['primary', 'outline'];
export const ButtonSizes: ButtonSizeInfo[] = ['sm', 'md', 'lg'];
export const ButtonBrands: ButtonBrandInfo[] = ['mfb', 'bb', 'fs'];
// #endregion

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  color?: ButtonColorInfo;
  brand?: ButtonBrandInfo;
  size?: ButtonSizeInfo;
  disabled?: boolean;
}

const Button = ({
  size,
  color,
  disabled,
  brand,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={twMerge(
        ...Object.values(styles),
        buttonStyles({ size, color, disabled, brand }),
        className,
      )}
    >
      {props.children}
    </button>
  );
};

export default Button;
