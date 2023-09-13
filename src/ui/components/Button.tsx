'use client';

import { cn } from 'utils';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { forwardRef, type ComponentProps, type ReactNode } from 'react';

const buttonVariants = cva(
  'flex flex-row items-center justify-between gap-3 font-semibold transition duration-300 disabled:opacity-60',
  {
    variants: {
      variant: {
        default:
          'bg-black text-white hover:bg-gray-900 disabled:hover:bg-black px-7 py-3 my-4 rounded-lg',
        google:
          'bg-red-400 text-white hover:bg-red-500 disabled:hover:bg-red-400 px-7 py-3 my-4 rounded-lg',
        image: `bg-transparent rounded-full`,
      },

      size: {
        lg: 'text-lg',
        md: 'text-md',
        sm: 'text-sm',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'lg',
    },
  }
);

interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'className'>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={cn(buttonVariants({ variant, size }))}
    />
  )
);

Button.displayName = 'Button';

export { buttonVariants, Button };
export type { ButtonProps };
