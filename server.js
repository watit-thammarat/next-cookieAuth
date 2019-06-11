const next = require('next');
const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

const AUTH_USER_TYPE = 'authenticated';
const COOKIE_SECRET = 'hello world';
const COOKIE_OPTION = {
  httpOnly: true,
  secure: !dev,
  signed: true
};

const authenticate = async (email, password) => {
  try {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    return data.find(d => d.email === email && d.website === password);
  } catch (err) {
    console.error(err);
    return null;
  }
};

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));
  server.use(cookieParser(COOKIE_SECRET));
  server.use(express.json({ extended: false }));

  server.get('/api/profile', async (req, res) => {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    if (token && token.email) {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      const user = data.find(d => d.email === token.email);
      return res.json({ user });
    }
    res.status(404);
  });

  server.post('/api/logout', (req, res) => {
    res.clearCookie('token', COOKIE_OPTION);
    res.sendStatus(204);
  });

  server.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await authenticate(email, password);
    if (!user) {
      return res.status(403).send('Invalid email or password');
    }
    const userData = {
      name: user.name,
      email: user.email,
      type: AUTH_USER_TYPE
    };
    res.cookie('token', userData, COOKIE_OPTION);
    return res.json(userData);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) {
      throw err;
    }
    console.log(`Listening on PORT ${port}`);
  });
});
