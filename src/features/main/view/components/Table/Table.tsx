import { FC } from 'react';
import { LinkObject } from 'src/shared/api/types';
import { TableRow } from '../TableRow/TableRow';
import styles from './Table.module.scss';

type Props = {
  linkObjects: LinkObject[];
};

const Table: FC<Props> = ({ linkObjects }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Короткая ссылка</th>
          <th>Исходная ссылка</th>
          <th>Кол-во переходов</th>
        </tr>
      </thead>
      <tbody>
        {linkObjects.map((el) => (
          <TableRow
            key={el.id}
            short={el.short}
            target={el.target}
            counter={el.counter}
          />
        ))}
      </tbody>
    </table>
  );
};

export { Table };
