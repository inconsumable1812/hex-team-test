import { FC, SyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { reset as loginReset } from 'src/features/login/redux/slice';
import { Container, Input, Loader } from 'src/shared/components';
import { selectLinkObjects } from '../redux/selectors';
import { reset } from '../redux/slice';
import { Table } from './components/Table/Table';
import styles from './MainContainer.module.scss';

type Props = {
  showLoading?: boolean;
};

const MainContainer: FC<Props> = ({ showLoading = false }) => {
  const dispatch = useAppDispatch();
  const { linkObjects } = useAppSelector(selectLinkObjects);
  const [URL, setURL] = useState('');
  const changeURL = (e: SyntheticEvent<HTMLInputElement>) => {
    setURL(e.currentTarget.value.trim());
  };
  const handlerSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const logout = () => {
    dispatch(loginReset());
    dispatch(reset());
  };

  return (
    <Container>
      {showLoading ? (
        <Loader />
      ) : (
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
          <Table linkObjects={linkObjects}></Table>
        </div>
      )}
    </Container>
  );
};

export { MainContainer };
