import { FC } from 'react';

import styles from './Loader.module.css';

type Props = {};

const Loader: FC<Props> = () => {
  return (
    <div className={styles['lds-default']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export { Loader };
