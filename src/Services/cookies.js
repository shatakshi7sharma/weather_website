import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const setCookie = (cname, cvalue, path) => {
  cookies.set(cname, cvalue);
}

// get cookies
export const getCookie = (cname) => {
  return cookies.get(cname);
}

//remove cookies
export const removeCookie = (cname) => {
  cookies.remove(cname);
}


