import { forwardRef, type ComponentProps } from 'react';

interface Props extends Omit<ComponentProps<'input'>, 'className'> {}

const Input = forwardRef<HTMLInputElement, Props>(({ ...props }, ref) => (
  <input
    ref={ref}
    className="border-2 border-gray-300 rounded-lg outline-none transition-all duration-400 ease-in-out focus:ring-2 ring-blue-400 focus:outline-none text-gray-500 font-normal w-full px-5 py-3"
    {...props}
  />
));

Input.displayName = 'Input';

export { Input };
