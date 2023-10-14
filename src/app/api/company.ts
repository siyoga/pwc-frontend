import type { Company, CompanyUpdatableParams } from 'types/User';

import api from './ky';

export async function uploadCompanyLogo(
  image: File,
  accessToken: string
): Promise<Company | false> {
  const imageInfo = new FormData();
  imageInfo.append('companyLogo', image);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/company/logo/upload`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: imageInfo,
    }
  );

  if (response.status !== 200) {
    return false;
  }

  return await response.json();
}

export async function updateCompanyInfo(
  newInfo: CompanyUpdatableParams,
  accessToken: string
): Promise<Company | false> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/company/update`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(newInfo),
    }
  );

  if (response.status !== 200) {
    return false;
  }

  return await response.json();
}

export async function getCompanyInfo(id: string): Promise<Company | false> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/company/get?` +
      new URLSearchParams({
        id: id,
      }),
    {
      method: 'GET',
    }
  );

  if (response.status !== 200) {
    return false;
  }

  return await response.json();
}
