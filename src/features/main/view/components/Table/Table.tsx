import { FC, SyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { selectLogin } from 'src/features/login/redux/selectors';
import { getStatistics } from 'src/features/main/redux/thunks';
import { findLinksPerPage, sortLinks } from 'src/features/main/utils';
import { LinkObject } from 'src/shared/api/types';
import { ArrowIcon, UpdateIcon } from 'src/shared/components';
import { TableRow } from '../TableRow/TableRow';
import styles from './Table.module.scss';

type Props = {
  linkObjects: LinkObject[];
  activePage: number;
  itemsCountPerPage: number;
  onChangeItemsPerPage: (number: number) => void;
};

const Table: FC<Props> = ({
  linkObjects,
  activePage,
  itemsCountPerPage,
  onChangeItemsPerPage
}) => {
  const [isDescendingByCount, setIsDescendingByCount] = useState(false);
  const [isDescendingByTarget, setIsDescendingByTarget] = useState(false);
  const [isDescendingByShort, setIsDescendingByShort] = useState(false);
  const { token_type, access_token } = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  const sortedObject = sortLinks({
    linkObjects,
    isDescendingByTarget,
    isDescendingByShort,
    isDescendingByCount
  });
  const linksPerPage = findLinksPerPage({
    activePage,
    itemsCountPerPage,
    linkObjects: sortedObject
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

  const updateObj = () => {
    if (access_token === null || token_type === null) return;
    dispatch(getStatistics({ access_token, token_type }));
  };

  const handleChangeItemsPerPage = (e: SyntheticEvent<HTMLSelectElement>) => {
    const newValue = +e.currentTarget.value;
    onChangeItemsPerPage(newValue);
  };

  return (
    <>
      {sortedObject.length === 0 ? (
        <h2>У вас ещё нет добавленных ссылок</h2>
      ) : (
        <div>
          <div className={styles.tableOptions}>
            <div className={styles.updIcon} onClick={updateObj}>
              <UpdateIcon></UpdateIcon>
            </div>
            <div>
              <span className={styles.selectCaption}>
                Кол-во строк на странице:
              </span>
              <select
                className={styles.select}
                value={itemsCountPerPage}
                onChange={handleChangeItemsPerPage}
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
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
              {linksPerPage.map((el) => (
                <TableRow
                  key={el.id}
                  short={el.short}
                  target={el.target}
                  counter={el.counter}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export { Table };
