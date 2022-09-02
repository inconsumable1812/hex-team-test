import { FC, SyntheticEvent, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { selectLogin } from 'src/features/login/redux/selectors';
import { getStatistics } from 'src/features/main/redux/thunks';
import { findLinksPerPage, sortLinks } from 'src/features/main/utils';
import { LinkObject } from 'src/shared/api/types';
import { ArrowIcon, Input, UpdateIcon } from 'src/shared/components';
import { TableRow } from '../TableRow/TableRow';
import styles from './Table.module.scss';

type Props = {
  linkObjects: LinkObject[];
};

const Table: FC<Props> = ({ linkObjects }) => {
  const [isDescendingByCount, setIsDescendingByCount] = useState(false);
  const [isDescendingByTarget, setIsDescendingByTarget] = useState(false);
  const [isDescendingByShort, setIsDescendingByShort] = useState(false);
  const [filterByCount, setFilterByCount] = useState('');
  const [filterByTarget, setFilterByTarget] = useState('');
  const [filterByShort, setFilterByShort] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);

  const { token_type, access_token } = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  const sortedObject = sortLinks({
    linkObjects,
    isDescendingByTarget,
    isDescendingByShort,
    isDescendingByCount
  })
    .filter((el) => {
      if (filterByShort.trim().length === 0) return true;
      return el.short.toUpperCase().includes(filterByShort.toUpperCase());
    })
    .filter((el) => {
      if (filterByTarget.trim().length === 0) return true;
      return el.target.toUpperCase().includes(filterByTarget.toUpperCase());
    })
    .filter((el) => {
      if (filterByCount.trim().length === 0) return true;
      if (Number.isNaN(filterByCount)) return true;
      return el.counter === Number(filterByCount);
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
  const handleChangePage = (pageNumber: number) => {
    if (pageNumber === activePage) return;
    setActivePage(pageNumber);
  };

  const handleChangeItemsPerPage = (e: SyntheticEvent<HTMLSelectElement>) => {
    const newValue = +e.currentTarget.value;
    setItemsCountPerPage(newValue);
  };
  const changeFilterByShort = (e: SyntheticEvent<HTMLInputElement>) => {
    setFilterByShort(e.currentTarget.value);
  };
  const changeFilterByTarget = (e: SyntheticEvent<HTMLInputElement>) => {
    setFilterByTarget(e.currentTarget.value);
  };
  const changeFilterByCount = (e: SyntheticEvent<HTMLInputElement>) => {
    setFilterByCount(e.currentTarget.value);
  };

  return (
    <>
      {linkObjects.length === 0 ? (
        <h2>У вас ещё нет добавленных ссылок</h2>
      ) : (
        <div>
          <div className={styles.filtersContainer}>
            <h2>Фильтры:</h2>
            <div className={styles.inputContainer}>
              <Input
                value={filterByShort}
                type={'text'}
                label={'По короткому адресу'}
                onChange={changeFilterByShort}
              ></Input>
              <Input
                value={filterByTarget}
                type={'text'}
                label={'По длинному адресу'}
                onChange={changeFilterByTarget}
              ></Input>
              <Input
                value={filterByCount}
                type={'text'}
                label={'По кол-ву переходов'}
                onChange={changeFilterByCount}
              ></Input>
            </div>
          </div>
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
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={sortedObject.length}
            pageRangeDisplayed={4}
            onChange={handleChangePage}
            innerClass={styles.pagination}
            itemClass={styles.paginationItem}
            activeClass={styles.activeItem}
            disabledClass={styles.disabledItem}
          />
          {linksPerPage.length === 0 && (
            <h3 className={styles.emptyHeading}>Таких элементов не найдено</h3>
          )}
        </div>
      )}
    </>
  );
};

export { Table };
