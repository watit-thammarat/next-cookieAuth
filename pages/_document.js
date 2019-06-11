import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import { getServerSideToken } from '../lib/auth';
import { WINDOW_USER_SCRIPT_VARIABLE } from '../config';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const props = await Document.getInitialProps(ctx);
    const userData = getServerSideToken(ctx.req);

    return { ...props, ...userData };
  }

  getUserScript = user => {
    return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`;
  };

  render() {
    const { user } = this.props;
    return (
      <html>
        <Head />
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: this.getUserScript(user)
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
