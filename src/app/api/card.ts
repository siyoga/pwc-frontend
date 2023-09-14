import { Card } from 'types/Card';
import { Error } from 'types/Error';

import { HTTPError } from 'ky';

import api from './ky';

export async function getCardsByCompany(
  companyId: string
): Promise<Card[] | Error> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/card/get?${new URLSearchParams({
      id: companyId,
    })}`,
    {
      method: 'GET',
    }
  );

  if (response.status !== 200) {
    return (await response.json()) as Error;
  }

  return (await response.json()) as Card[];
}

export async function getAllCards(): Promise<Card[] | Error> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/card/get/all`,
    {
      method: 'GET',
    }
  );

  if (response.status !== 200) {
    return (await response.json()) as Error;
  }

  return (await response.json()) as Card[];
}

export async function createCard(
  name: string,
  url: string,
  logoUrl: string,
  description: string,
  price: string,
  accessToken: string
): Promise<Card | Error> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/card/create`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name: name,
        linkToWebsite: url,
        price: price,
        description: description,
        logoLink: logoUrl,
      }),
    }
  );

  if (response.status !== 201) {
    return (await response.json()) as Error;
  }

  return (await response.json()) as Card;
}

export async function uploadCardLogo(
  image: File,
  cardId: string,
  accessToken: string
): Promise<Card | Error> {
  const imageInfo = new FormData();
  imageInfo.append('cardLogo', image);

  const response = await api.post('company/card/upload', {
    headers: { Authorization: `Bearer ${accessToken}`, Card: cardId },
    body: imageInfo,
  });

  if (!response.ok) {
    return await response.json<Error>();
  }

  return await response.json<Card>();
}
