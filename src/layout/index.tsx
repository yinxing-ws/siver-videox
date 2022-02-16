import React from 'react';
import { Fragment } from 'react';
import { ConfigProvider } from '@alifd/next';
import Header from './Header';

import styles from './index.module.scss';

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider>
      <Fragment>
        <div className={styles.header}>
          <Header
            image='https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png'
            text='Logo'
          />
        </div>
        <div className={styles.content}>{children}</div>
      </Fragment>
    </ConfigProvider>
  );
}
