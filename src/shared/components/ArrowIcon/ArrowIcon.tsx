import { FC } from 'react';
import styles from './ArrowIcon.module.scss';

type Props = {};

const ArrowIcon: FC<Props> = () => {
  return (
    <svg height="100%" viewBox="0 0 128 128" width="100%">
      <g>
        <line className={styles.line} x1="111" x2="64" y1="40.5" y2="87.499" />
        <line className={styles.line} x1="64" x2="17" y1="87.499" y2="40.5" />
      </g>
    </svg>
  );
};

export { ArrowIcon };
