import { FC, useState } from 'react';
import { LinkObject } from 'src/shared/api/types';
import { ArrowIcon } from 'src/shared/components';
import { TableRow } from '../TableRow/TableRow';
import styles from './Table.module.scss';

type Props = {
  linkObjects: LinkObject[];
};

const Table: FC<Props> = ({ linkObjects }) => {
  const [isDescendingByCount, setIsDescendingByCount] = useState(false);
  const [isDescendingByTarget, setIsDescendingByTarget] = useState(false);
  const [isDescendingByShort, setIsDescendingByShort] = useState(false);
  const sortedObject = [...linkObjects].sort((a, b) => {
    if (isDescendingByTarget) {
      if (a.target > b.target) return 1;
      if (a.target === b.target) return 0;
      if (a.target < b.target) return -1;
    }

    if (isDescendingByShort) {
      if (a.short > b.short) return 1;
      if (a.short === b.short) return 0;
      if (a.short < b.short) return -1;
    }

    return isDescendingByCount
      ? a.counter - b.counter
      : -(a.counter - b.counter);
  });

  const changeCountIcon = () => {
    if (isDescendingByTarget) setIsDescendingByTarget(false);
    if (isDescendingByShort) setIsDescendingByShort(false);
    setIsDescendingByCount((prev) => !prev);
  };

  const changeTargetIcon = () => {
    if (isDescendingByCount) setIsDescendingByCount(false);
    if (isDescendingByShort) setIsDescendingByShort(false);
    setIsDescendingByTarget((prev) => !prev);
  };

  const changeShortIcon = () => {
    if (isDescendingByTarget) setIsDescendingByTarget(false);
    if (isDescendingByCount) setIsDescendingByCount(false);
    setIsDescendingByShort((prev) => !prev);
  };

  return (
    <>
      {sortedObject.length === 0 ? (
        <h2>У вас ещё нет добавленных ссылок</h2>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <div className={styles.cellContent}>
                  <p> Короткая ссылка</p>
                  <div
                    className={[
                      styles.icon,
                      isDescendingByShort ? styles.rotate : ''
                    ].join(' ')}
                    onClick={changeShortIcon}
                  >
                    <ArrowIcon></ArrowIcon>
                  </div>
                </div>
              </th>
              <th>
                <div className={styles.cellContent}>
                  <p> Исходная ссылка</p>
                  <div
                    className={[
                      styles.icon,
                      isDescendingByTarget ? styles.rotate : ''
                    ].join(' ')}
                    onClick={changeTargetIcon}
                  >
                    <ArrowIcon></ArrowIcon>
                  </div>
                </div>
              </th>
              <th>
                <div className={styles.cellContent}>
                  <p>Кол-во переходов</p>
                  <div
                    className={[
                      styles.icon,
                      isDescendingByCount ? styles.rotate : ''
                    ].join(' ')}
                    onClick={changeCountIcon}
                  >
                    <ArrowIcon></ArrowIcon>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedObject.map((el) => (
              <TableRow
                key={el.id}
                short={el.short}
                target={el.target}
                counter={el.counter}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export { Table };
