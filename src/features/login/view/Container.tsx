import { FC, SyntheticEvent, useState } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { Input, Loader } from 'src/shared/components';
import { login } from '../redux/thunks/login';

// import styles from './PeopleCard.module.scss';

type Props = {
  showLoading?: boolean;
};

const Container: FC<Props> = ({ showLoading = false }) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeUsername = (e: SyntheticEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value.trim());
  };
  const changePassword = (e: SyntheticEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {showLoading && <Loader />}
      <Input
        value={username}
        type={'text'}
        label={'Введите имя пользователя'}
        onChange={changeUsername}
      />
      <Input
        value={password}
        type={'password'}
        label={'Введите Пароль'}
        onChange={changePassword}
      />
      <button>Войти</button>
    </form>
  );
};

export { Container };
