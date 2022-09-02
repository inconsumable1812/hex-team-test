import { FC, SyntheticEvent, useState } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { Input, Loader } from 'src/shared/components';
import { selectLinkObjects } from '../redux/selectors';
import { Table } from './components/Table/Table';

// import styles from './PeopleCard.module.scss';

type Props = {
  showLoading?: boolean;
};

const Container: FC<Props> = ({ showLoading = false }) => {
  const { linkObjects } = useAppSelector(selectLinkObjects);
  const [URL, setURL] = useState('');
  const changeURL = (e: SyntheticEvent<HTMLInputElement>) => {
    setURL(e.currentTarget.value.trim());
  };

  return (
    <>
      {showLoading ? (
        <Loader />
      ) : (
        <>
          <Input
            value={URL}
            type="text"
            label="Вставьте ссылку"
            onChange={changeURL}
          ></Input>
          <Table linkObjects={linkObjects}></Table>
        </>
      )}
    </>
  );
};

export { Container };
