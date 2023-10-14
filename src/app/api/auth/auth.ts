import { Tokens } from 'types/Tokens';
import { Company, CompanyCredentials } from 'types/User';

import api from '../ky';

export async function registerViaGoogle(
  tokenId: string,
  creds: Omit<CompanyCredentials, 'id'>
): Promise<Company | false> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/auth/register`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenId}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(creds),
    }
  );

  if (response.status !== 201 && response.status !== 200) {
    console.log(response);
    console.log(await response.json());
    return false;
  }

  return await response.json();
}

export async function login(
  creds: Omit<CompanyCredentials, 'id' | 'viaGoogle'>
): Promise<Tokens | false> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/auth/login`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(creds),
    }
  );

  if (response.status !== 200) {
    console.log(response);
    console.log(await response.json());
    return false;
  }

  return await response.json();
}

export async function refresh(refreshToken: string): Promise<Tokens | false> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/auth/refresh`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer: ${refreshToken}`,
      },
    }
  );

  if (response.status !== 200) {
    return false;
  }

  return await response.json();
}

export async function whoAmI(accessToken: string): Promise<Company | false> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/auth/whoami`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer: ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    return false;
  }

  return await response.json();
}
