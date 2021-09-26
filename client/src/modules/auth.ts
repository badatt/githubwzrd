import Cookies from 'js-cookie';

export function fetchJwt() {
  return Cookies.get('Token') || process.env.TOKEN;
}
