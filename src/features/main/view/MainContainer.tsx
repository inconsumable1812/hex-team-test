import { FC, SyntheticEvent, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  reset as loginReset,
  selectLogin
} from 'src/features/login/redux/slice';
import { Container, Input, Loader } from 'src/shared/components';
import { selectLinkObjects } from '../redux/selectors';
import { reset } from '../redux/slice';
import { squeeze } from '../redux/thunks';
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
  const handleChangePage = (pageNumber: number) => {
    if (pageNumber === activePage) return;
    setActivePage(pageNumber);
  };
  const onChangeItemsPerPage = (number: number) => {
    setItemsCountPerPage(number);
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

        <Table
          itemsCountPerPage={itemsCountPerPage}
          activePage={activePage}
          linkObjects={linkObjects}
          onChangeItemsPerPage={onChangeItemsPerPage}
        ></Table>
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
