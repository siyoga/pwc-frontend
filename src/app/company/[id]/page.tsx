import { getCompanyInfo } from 'app/api/company';
import plusSvg from 'public/plus.svg';
import plainUserSvg from 'public/user.svg';
import { Button } from 'ui/components/Button';

import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const company = await getCompanyInfo(params.id);

  if (!company) {
    return (
      <>
        <h1>Такой компании не существует</h1>
      </>
    );
  }

  return (
    <div className="w-full sm:w-5/12 px-7 sm:px-0">
      <div className="flex flex-row justify-between items-center gap-4 rounded-full w-full pb-8">
        <Image
          alt={`${company.id}-logo`}
          src={company.image === null ? plainUserSvg : company.image}
          width={50}
          height={50}
        />
        <span className="flex flex-col justify-center items-start gap-2">
          <h1 className="font-bold text-2xl">{company.name}</h1>
          <Link
            href={company.linkToCompany}
            className="font-normal text-base underline underline-offset-1"
          >
            {company.linkToCompany}
          </Link>
        </span>
      </div>
      <span className="flex flex-row justify-between items-start gap-2 w-full px-4">
        <h2 className="text-lg font-semibold">Продукты</h2>
        <Link href="/card/create">
          <Image alt="add-img" src={plusSvg} />
        </Link>
      </span>
    </div>
  );
}
