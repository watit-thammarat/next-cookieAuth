import React, { Fragment } from 'react';
import Link from 'next/link';

import { logoutUser } from '../lib/auth';

const Layout = ({ children, title, auth }) => {
  const { user } = auth;

  const onLogout = async () => {
    await logoutUser();
  };

  return (
    <div className='root'>
      <nav className='navbar'>
        <span>
          Welcome, <strong>{user.name || 'GUEST'}</strong>
        </span>
        <div>
          {user.email ? (
            <Fragment>
              <Link href='/'>
                <a>Home</a>
              </Link>
              <Link href='/profile'>
                <a>Profile</a>
              </Link>
              <button onClick={onLogout}>Logout</button>
            </Fragment>
          ) : (
            <Fragment>
              <Link href='/'>
                <a>Home</a>
              </Link>
              <Link href='/login'>
                <a>Login</a>
              </Link>
            </Fragment>
          )}
        </div>
      </nav>

      <h1>{title}</h1>

      {children}

      <style jsx>{`
        .root {
          display: flex;
          align-item: center;
          justify-content: center;
          flex-direction: column;
        }

        .navbar {
          width: 100%;
          display: flex;
          justify-content: space-around;
        }

        a {
          margin-right: 0.5em;
        }

        button {
          outline: none;
          margin-right: 0.5em;
          text-decoration: underline;
          padding: 0;
          font: inherit;
          cursor: pointer;
          border-style: none;
          color: rgb(0, 0, 238);
        }

        button:active {
          color: -webkit-activelink;
        }

        h1 {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Layout;
