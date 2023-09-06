'use client';

import { signIn } from 'next-auth/react';
import type { ClientSafeProvider } from 'next-auth/react';

import { Button, ButtonProps } from './Button';

interface Props extends Omit<ButtonProps, 'onClick'> {
  provider: ClientSafeProvider;
}

export default function SignInButton({ provider, ref, ...props }: Props) {
  return (
    <Button
      onClick={() => {
        localStorage.clear();
        signIn(provider.id);
      }}
      variant={provider.id as 'google'}
      {...props}
    />
  );
}
