import React, { useState } from 'react';
import Router from 'next/router';

import { loginUser } from '../lib/auth';

const LoginForm = () => {
  const [state, setState] = useState({
    email: 'Sincere@april.biz',
    password: 'hildegard.org'
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { email, password } = state;

  const handleChange = e =>
    setState({ ...state, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      await loginUser(email, password);
      Router.push('/profile');
    } catch (err) {
      console.error(err);
      setError((err.response && err.response.data) || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type='email'
          name='email'
          placeholder='email'
          value={email}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type='password'
          name='password'
          placeholder='password'
          value={password}
          onChange={handleChange}
        />
      </div>
      <button disabled={loading} type='submit'>
        {loading ? 'Submitting' : 'Submit'}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default LoginForm;
