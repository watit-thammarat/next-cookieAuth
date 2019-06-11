import React from 'react';
import Link from 'next/link';

import Layout from '../components/Layout';
import { authInitialProps } from '../lib/auth';

const Index = props => {
  return (
    <Layout title='Home' {...props}>
      <Link href='/profile'>
        <a>Go to Profile</a>
      </Link>
    </Layout>
  );
};

Index.getInitialProps = authInitialProps();

export default Index;
