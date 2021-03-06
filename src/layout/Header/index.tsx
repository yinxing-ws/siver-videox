import React from 'react';
import { Link } from 'ice';
import styles from './index.module.scss';

export interface ILogoProps {
  image?: string;
  text?: string;
  url?: string;
}

export default function Logo({ image, url }: ILogoProps) {
  return (
    <Link to={url || '/'} className={styles.logo}>
      {image && <img src={image} alt="logo" />}
    </Link>
  );
}
