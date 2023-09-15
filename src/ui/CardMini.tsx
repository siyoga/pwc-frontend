import { authOptions } from 'app/api/auth/[...nextauth]/route';
import { getCompanyInfo } from 'app/api/company';
import documentSvg from 'public/document.svg';
import { Card } from 'types/Card';
import { Company } from 'types/User';

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

type Props = {
  card: Card;
};

export default async function CardMini({ card }: Props) {
  const company = (await getCompanyInfo(card.companyOwner)) as Company;

  return (
    <>
      <div className="py-5 px-7 flex flex-col w-full border-4 border-gray-300 rounded-xl">
        <span className="flex flex-row justify-between items-center">
          <h1 className="text-lg font-bold">{card.name}</h1>
          <Link href={card.linkToWebsite} className="text-sm">
            {card.linkToWebsite}
          </Link>
        </span>
        <span className="flex flex-row justify-between items-center w-full pt-8">
          <span className="flex flex-row gap-3">
            {company.image && company.image !== '' && (
              <Image
                alt={`${company.name}_logo`}
                src={company.image as string}
                width={25}
                height={20}
              />
            )}
            <Link href={`/company/${company.id}`} />
          </span>
          <span className="flex flex-row justify-center items-center">
            <h3 className="text-base font-semibold">{card.price}</h3>
          </span>
        </span>
      </div>
    </>
  );
}
