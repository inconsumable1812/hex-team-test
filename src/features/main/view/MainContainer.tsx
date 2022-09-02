import { FC, SyntheticEvent, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  reset as loginReset,
  selectLogin
} from 'src/features/login/redux/slice';
import { Container, Input, Loader, UpdateIcon } from 'src/shared/components';
import { selectLinkObjects } from '../redux/selectors';
import { reset } from '../redux/slice';
import { getStatistics, squeeze } from '../redux/thunks';
import { findLinksPerPage } from '../utils';
import { Table } from './components/Table/Table';
import styles from './MainContainer.module.scss';

type Props = {
  showLoading?: boolean;
};

const MainContainer: FC<Props> = ({ showLoading = false }) => {
  const dispatch = useAppDispatch();
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
  const { linkObjects } = useAppSelector(selectLinkObjects);
  const [URL, setURL] = useState('');
  const { token_type, access_token } = useAppSelector(selectLogin);
  const changeURL = (e: SyntheticEvent<HTMLInputElement>) => {
    setURL(e.currentTarget.value.trim());
  };
  const handlerSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (URL.trim().length === 0) return;
    if (token_type === null || access_token === null) return;
    dispatch(squeeze({ link: URL, token_type, access_token }));
    setURL('');
  };

  const logout = () => {
    dispatch(loginReset());
    dispatch(reset());
  };

  const updateObj = () => {
    if (access_token === null || token_type === null) return;
    dispatch(getStatistics({ access_token, token_type }));
  };

  const linksPerPage = findLinksPerPage({
    activePage,
    itemsCountPerPage,
    linkObjects
  });
  const handleChangePage = (pageNumber: number) => {
    if (pageNumber === activePage) return;
    setActivePage(pageNumber);
  };
  const handleChangeItemsPerPage = (e: SyntheticEvent<HTMLSelectElement>) => {
    const newValue = +e.currentTarget.value;
    setItemsCountPerPage(newValue);
  };

  return (
    <Container>
      <div className={styles.root}>
        <button onClick={logout} type={'button'} className={styles.logout}>
          Выйти из профиля
        </button>
        <form onSubmit={handlerSubmit}>
          <Input
            value={URL}
            type="text"
            label="Вставьте ссылку"
            placeholder="Вставьте ссылку"
            onChange={changeURL}
          ></Input>
          <button className={styles.button}>Добавить ссылку</button>
        </form>
        {showLoading && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
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
              </select>
            </div>
          </div>
          <Table linkObjects={linksPerPage}></Table>
        </div>
      </div>

      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={linkObjects.length}
        pageRangeDisplayed={4}
        onChange={handleChangePage}
        innerClass={styles.pagination}
        itemClass={styles.paginationItem}
        activeClass={styles.activeItem}
        disabledClass={styles.disabledItem}
      />
    </Container>
  );
};

export { MainContainer };
