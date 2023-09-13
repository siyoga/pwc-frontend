'use client';

import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import userIcon from 'assets/user.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';
import { Fragment } from 'react';

const { Button, Items, Item } = Menu;

type Props = {
  session: Session;
};

export default function UserMenu({ session }: Props) {
  const router = useRouter();

  return (
    <Menu>
      <Button>
        {session.user.image ? (
          <Image
            className="rounded-full"
            alt="user_img"
            src={session.user.image}
            width={40}
            height={40}
          />
        ) : (
          <UserCircleIcon />
        )}
      </Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Items className="absolute right-10 top-20 origin-top-right p-4 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col items-start justify-center gap-2">
            <span className="border-b-2 border-black pb-3">
              {session.user.email}
            </span>

            <Item
              as={'button'}
              className="transition ease-out duration-200 hover:bg-black hover:text-white px-3 py-2 w-full text-left rounded-lg"
              onClick={() => {
                router.push(`company/${session.user.id}`);
              }}
            >
              Моя страница
            </Item>
          </div>
        </Items>
      </Transition>
    </Menu>
  );
}
