import './globals.css';
import UserMenu from 'ui/UserMenu';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { authOptions } from './api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontend Boilerplate',
  description: 'Made with love by siyoga',
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
          <span>Frontend Boilerplate</span>
          {!session ? (
            <span>
              <Link
                href={'/auth/signin'}
                className="bg-black rounded-lg px-6 py-3 text-white"
              >
                Sign In
              </Link>
            </span>
          ) : (
            <UserMenu session={session} />
          )}
        </header>
        <main className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 h-screen">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
