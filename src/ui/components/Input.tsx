import type { ComponentProps } from 'react';

interface Props extends Omit<ComponentProps<'input'>, 'className'> {}

export default function Input({ ...props }: Props) {
  return (
    <input
      className="border-2 border-gray-300 rounded-lg outline-none transition-all duration-400 ease-in-out focus:outline-4 focus:outline-blue-400/50 text-gray-500 font-normal w-full px-2 py-3"
      {...props}
    />
  );
}
