import type { Company, CompanyUpdatableParams } from 'types/User';

import api from './ky';

export async function uploadCompanyLogo(
  image: File,
  accessToken: string
): Promise<Company | false> {
  const imageInfo = new FormData();
  imageInfo.append('companyLogo', image);

  const response = await api.post('company/logo/upload', {
    headers: { Authorization: `Bearer ${accessToken}` },
    body: imageInfo,
  });

  if (!response.ok) {
    return false;
  }

  return await response.json<Company>();
}

export async function updateCompanyInfo(
  newInfo: CompanyUpdatableParams,
  accessToken: string
): Promise<Company | false | undefined> {
  try {
    const response = await api.post('company/update', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(newInfo),
    });

    if (!response.ok) {
      return false;
    }

    return await response.json<Company>();
  } catch (error) {
    console.log(error);
  }
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
