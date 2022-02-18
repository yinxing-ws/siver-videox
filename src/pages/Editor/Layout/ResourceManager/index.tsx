import React, { useState } from 'react';
import { Box, Grid } from '@alifd/next';

import styles from './index.module.scss';
import TitleBtn from '@/component/TitleBtn';
import MediaSelect from './MediaSelect';
import MediaItem from './MediaItem';

const { Row, Col } = Grid;

const mockMedia = new File([], 'test');

export default () => {
  const [mediaList, setMediaList] = useState<File[]>([mockMedia]);
  const [selectMedia, setSelectMedia] = useState<number>(-1);

  const onSelectMedia = (media: File) => {
    setMediaList((list) => {
      const ret = [...list];
      ret.push(media);
      return ret;
    });
  };

  const play = () => {
    const file = mediaList?.[selectMedia];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const videoDom = document.getElementById('mainVideo') as HTMLVideoElement;
    videoDom.src = url;
    videoDom.play();
  };

  const onItemClick = (index) => {
    setSelectMedia(index);
  };

  return (
    <Box direction="column" style={{ width: '100%', height: '100%' }}>
      <Row align="center" className={styles.header}>
        <Col span={20}>
          <Row>
            <span className={styles.title}>资源</span>
            <MediaSelect onSelect={onSelectMedia} />
          </Row>
        </Col>
        <Col span={4}>
          <TitleBtn onClick={play}>play</TitleBtn>
        </Col>
      </Row>
      <div className={styles.body}>
        <Box direction="row" wrap>
          {mediaList.map((item, index) => (
            <MediaItem
              media={item}
              isSelect={index === selectMedia}
              onClick={() => onItemClick(index)}
            />
          ))}
        </Box>
      </div>
    </Box>
  );
};
