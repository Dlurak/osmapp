import fetch from 'isomorphic-unfetch';
import { FetchError } from './helpers';

interface OsmAuthFetchOpts extends RequestInit {
  osmAccessToken: string;
}

const osmAuthFetch = async <T = any>(
  endpoint: string,
  options: OsmAuthFetchOpts,
): Promise<T> => {
  const { osmAccessToken, ...restOptions } = options;
  if (!osmAccessToken) throw new Error('No access token');

  const url = `https://api.openstreetmap.org${endpoint}`;
  const headers = {
    'User-Agent': 'osmapp (SSR; https://osmapp.org/)',
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${osmAccessToken}`,
  };

  const response = await fetch(url, {
    ...restOptions,
    headers,
  });

  if (!response.ok || response.status < 200 || response.status >= 300) {
    const data = await response.text();
    throw new FetchError(
      `${response.status} ${response.statusText}`,
      `${response.status}`,
      data,
    );
  }

  return response.json();
};

export const serverFetchOsmUser = async (
  options: OsmAuthFetchOpts,
): Promise<{ id: number; username: string }> => {
  const { user } = await osmAuthFetch('/api/0.6/user/details.json', options);
  return {
    id: user.id,
    username: user.display_name,
  };
};
