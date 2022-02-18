import React from 'react';

import styles from './index.module.scss';

interface Props {
  media: File;
  isSelect: boolean;
  onClick: () => void;
}

export default ({ media, isSelect, onClick }: Props) => {
  return (
    <div
      className={styles.wrapper}
      style={{ borderColor: isSelect ? '#fff' : 'transparent' }}
      onClick={onClick}
    >
      <img
        className={styles.img}
        src="https://gw.alicdn.com/bao/uploaded/i1/i1/2200783279618/O1CN01RuY5642Kv66BQmrnJ_!!2-item_pic.png"
      />
      <span className={styles.name}>{media.name}</span>
    </div>
  );
};
