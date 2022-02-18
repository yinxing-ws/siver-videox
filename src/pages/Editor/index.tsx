import React from 'react';
import { Box } from '@alifd/next';

import Main from './Layout/Main';
import ResourceManager from './Layout/ResourceManager';
import Timeline from './Layout/Timeline';

export default () => {
  return (
    <Box direction='column' style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '100%', height: '65%', display: 'flex' }}>
        <div style={{ width: '40%', height: '100%' }}>
          <ResourceManager />
        </div>
        <div style={{ width: '60%', height: '100%' }}>
          <Main />
        </div>
      </div>
      <div style={{ width: '100%', height: '35%' }}>
        <Timeline />
      </div>
    </Box>
  );
};
