import React, { useEffect, useState } from 'react';

import { getUserProfile } from '../lib/auth';
import Layout from '../components/Layout';
import { authInitialProps } from '../lib/auth';

const Profile = props => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getUserProfile();
      setUser(data);
    })();
  }, []);

  return (
    <Layout title='Profile' {...props}>
      {' '}
      <pre>{user && JSON.stringify(user, null, 2)}</pre>
    </Layout>
  );
};

Profile.getInitialProps = authInitialProps(true);

export default Profile;
