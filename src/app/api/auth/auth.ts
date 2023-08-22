import { Tokens } from 'types/Tokens';
import { Company, CompanyCredentials } from 'types/User';

import api from '../ky';

export async function registerViaGoogle(
  tokenId: string,
  creds: Omit<CompanyCredentials, 'id'>
): Promise<Company | false> {
  const registerResponse = await api.post('auth/register', {
    headers: {
      Authorization: `Bearer ${tokenId}`,
      'content-type': 'application/json',
    },
    json: {
      ...creds,
    },
  });

  if (registerResponse.status !== 200 && registerResponse.status !== 201) {
    return false;
  }

  return await registerResponse.json<Company>();
}

export async function login(
  credentials: Omit<CompanyCredentials, 'id' | 'viaGoogle'>
): Promise<Tokens | false> {
  const response = await api.post('auth/login', {
    body: JSON.stringify(credentials),
    headers: {
      'content-type': 'application/json',
    },
  });

  if (response.status === 400) {
    return false;
  }

  return await response.json<Tokens>();
}

export async function refresh(refreshToken: string): Promise<Tokens | false> {
  const response = await api.get('auth/refresh', {
    headers: {
      Authorization: `Bearer: ${refreshToken}`,
    },
  });

  if (!response.ok) {
    return false;
  }

  return await response.json<Tokens>();
}

export async function whoAmI(accessToken: string): Promise<Company | false> {
  const response = await api.get('auth/whoami', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    return false;
  }

  return await response.json<Company>();
}
