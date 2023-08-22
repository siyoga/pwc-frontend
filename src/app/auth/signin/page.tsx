import { authOptions } from 'app/api/auth/[...nextauth]/route';
import LogoStore from 'store/LogoStore';
import Input from 'ui/components/Input';
import SignInButton from 'ui/components/SignInButton';
import RegisterFlow from 'ui/RegisterFlow';

import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';

export default async function SignIn() {
  const providers = await getProviders();
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {session && session.user.name === '' ? (
        <RegisterFlow />
      ) : (
        <div>
          {providers ? (
            Object.values(providers).map((provider) => (
              <SignInButton key={provider.id} provider={provider}>
                <Image
                  alt={`${provider.id}_logo`}
                  src={LogoStore[`${provider.id}`]}
                  className="w-8"
                />
                {`Sign in with ${provider.name}`}
              </SignInButton>
            ))
          ) : (
            <p>Something went wrong...</p>
          )}
        </div>
      )}
    </div>
  );
}
