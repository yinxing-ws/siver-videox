import React from 'react';
import { Box } from '@alifd/next';

export default () => {
  return (
    <Box direction='row' style={{ width: '100%', height: '100%' }}>
      {/* 这里暂时放一个测试的video标签, 用于播放视频 */}
      {/* <video id="mainVideo" style={{ width: '100%', height: '100%' }} /> */}
      <canvas id='canvas' style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};
