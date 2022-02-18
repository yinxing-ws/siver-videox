import React from 'react';
import { Icon, Upload } from '@alifd/next';

import styles from './index.module.scss';

interface Props {
  onSelect: (file: File) => void;
}

export default ({ onSelect: propsOnSelect }: Props) => {
  const onSelect = (data) => {
    const file: File = data[0].originFileObj;
    propsOnSelect(file);
  };

  return (
    <Upload
      autoUpload={false}
      listType="image"
      onSelect={onSelect}
      value={[]}
      accept=".mp4"
    >
      <Icon type="add" className={styles.icon} size="small" />
    </Upload>
  );
};
