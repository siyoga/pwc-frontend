import { authOptions } from 'app/api/auth/[...nextauth]/route';
import Error from 'app/error';
import LogoStore from 'store/LogoStore';
import SignInButton from 'ui/components/SignInButton';
import { RegisterFormWrapper } from 'ui/forms/RegisterForm/RegisterFormWrapper';

import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';

export default async function SignIn() {
  const providers = await getProviders();
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold text-center mb-12">
        Создайте страницу вашей компании
      </h1>
      {session && session.user.name === '' ? (
        <RegisterFormWrapper />
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
                {`Войти с ${provider.name}`}
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
