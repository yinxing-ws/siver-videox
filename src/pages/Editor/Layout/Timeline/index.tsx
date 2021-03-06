import React from 'react';
import { Box, Grid } from '@alifd/next';

import styles from './index.module.scss';

const { Row } = Grid;

export default () => {
  return (
    <Box direction="column" style={{ width: '100%', height: '100%' }}>
      <Row align="center" className={styles.header}>
        <span className={styles.title}>TimeLine</span>
      </Row>
      <div className={styles.body}>
        <Box direction="row" wrap />
      </div>
    </Box>
  );
};
