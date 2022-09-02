import { FC, SyntheticEvent, useState } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { Container, Input, Loader } from 'src/shared/components';
import { selectLinkObjects } from '../redux/selectors';
import { Table } from './components/Table/Table';
import styles from './MainContainer.module.scss';

type Props = {
  showLoading?: boolean;
};

const MainContainer: FC<Props> = ({ showLoading = false }) => {
  const { linkObjects } = useAppSelector(selectLinkObjects);
  const [URL, setURL] = useState('');
  const changeURL = (e: SyntheticEvent<HTMLInputElement>) => {
    setURL(e.currentTarget.value.trim());
  };
  const handlerSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container>
      {showLoading ? (
        <Loader />
      ) : (
        <div className={styles.root}>
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
