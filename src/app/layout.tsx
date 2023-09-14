import './globals.css';
import { NextAuthProvider } from 'providers/NextAuthProvider';
import UserMenu from 'ui/UserMenu';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { authOptions } from './api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pay with crypto',
  description:
    'Подборка цифровых продуктов, где вы можете расплачиваться криптовалютой.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="absolute flex flex-row items-center justify-between px-12 py-8 w-full">
          <Link href="/">Pay with crypto</Link>
          {!session ? (
            <span>
              <Link
                href={'/auth/signin'}
                className="bg-black rounded-lg px-6 py-3 text-white"
              >
                Вход
              </Link>
            </span>
          ) : (
            <UserMenu session={session} />
          )}
        </header>
        <main className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 h-screen px-3 md:px-0">
            <NextAuthProvider>{children}</NextAuthProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
