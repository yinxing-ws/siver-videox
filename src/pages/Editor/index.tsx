import React, { useEffect } from 'react';
import { Box } from '@alifd/next';

import Main from './Layout/Main';
import ResourceManager from './Layout/ResourceManager';
import Timeline from './Layout/Timeline';
import { Engine } from '@/siver/Engine';

export default () => {
  useEffect(() => {
    // 取消默认的浏览器自带右键
    window.oncontextmenu = (e) => {
      e.preventDefault();
    };
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const engine = new Engine(canvas);
    engine.resourceManager
      .loadMp4('https://gw.alipayobjects.com/os/lottie-asset/919a864a-d73c-460b-9bc7-3274c0e2f786/1.mp4')
      .then((list) => {
        list.sort((a, b) => a.timestamp - b.timestamp);
        engine.tPlay(list);
      });
    // const guidao1 = engine.createGuiDao();
    // guidao1.add(testFile);
    // engine.play();
  }, []);

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
