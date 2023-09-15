import { Card } from 'types/Card';
import CardMini from 'ui/CardMini';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import uuid from 'react-uuid';

import { authOptions } from './api/auth/[...nextauth]/route';
import { getAllCards } from './api/card';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const cards = (await getAllCards()) as Card[];

  if (session?.user.name === '') {
    redirect('/auth/signin');
  }

  return (
    <div className="w-full lg:w-11/12 xl:w-10/12 flex flex-col">
      <h1 className="font-bold text-2xl w-full text-start border-b-4 pb-3 border-black border-spacing-4">
        Популярное
      </h1>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 pt-5">
        {cards.map((card) => (
          <CardMini key={uuid()} card={card} />
        ))}
      </div>
    </div>
  );
}
