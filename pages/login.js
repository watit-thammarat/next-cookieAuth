import React from 'react';

import LoginForm from '../components/LoginForm';
import Layout from '../components/Layout';
import { authInitialProps } from '../lib/auth';

const Login = props => {
  return (
    <Layout title='Log in' {...props}>
      <LoginForm />
    </Layout>
  );
};

Login.getInitialProps = authInitialProps();

export default Login;
