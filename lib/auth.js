import axios from 'axios';
import Router from 'next/router';

import { WINDOW_USER_SCRIPT_VARIABLE } from '../config';

axios.defaults.withCredentials = true;

export const loginUser = async (email, password) => {
  const { data } = await axios.post('/api/login', { email, password });
  if (typeof window !== 'undefined') {
    window[WINDOW_USER_SCRIPT_VARIABLE] = data || {};
  }
};

export const logoutUser = async () => {
  if (typeof window !== 'undefined') {
    window[WINDOW_USER_SCRIPT_VARIABLE] = {};
  }
  await axios.post('/api/logout');
  Router.push('/login');
};

export const getUserProfile = async email => {
  try {
    const { data } = await axios.get('/api/profile');
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getServerSideToken = req => {
  const { signedCookies = {} } = req;
  if (!signedCookies) {
    return { user: {} };
  }
  const { token } = signedCookies;
  if (!token) {
    return { user: {} };
  }
  return { user: token };
};

export const getClientSideToken = () => {
  if (typeof window === 'undefined') {
    return { user: {} };
  }
  const user = window[WINDOW_USER_SCRIPT_VARIABLE] || {};
  return { user };
};

export const authInitialProps = isAuth => ({ req, res }) => {
  const auth = req ? getServerSideToken(req) : getClientSideToken();
  const { user } = auth;
  const isAnonymous = user.type !== 'authenticated';
  const loginPath = '/login';
  if (isAuth && isAnonymous) {
    return redirectUser(res, loginPath);
  }
  return { auth };
};

const redirectUser = (res, path) => {
  if (res) {
    res.redirect(302, path);
    res.finished = true;
  } else {
    Router.replace(path);
  }
  return {};
};
