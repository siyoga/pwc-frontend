import ky from 'ky';

const api = ky.extend({
  prefixUrl: process.env.NEXT_PUBLIC_SERVER_ADDRESS,
});

export default api;
