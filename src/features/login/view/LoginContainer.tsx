import { FC, SyntheticEvent, useState } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { Container, Input, Loader } from 'src/shared/components';
import { login } from '../redux/thunks/login';
import styles from './LoginContainer.module.scss';

type Props = {
  showLoading?: boolean;
};

const LoginContainer: FC<Props> = ({ showLoading = false }) => {
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
    if (username.trim().length !== 0 && password.trim().length !== 0) {
      dispatch(login({ username, password }));
    }
  };

  return (
    <Container>
      <form className={styles.form} onSubmit={handleSubmit}>
        {showLoading && <Loader />}
        <Input
          value={username}
          type={'text'}
          label={'Введите имя пользователя'}
          onChange={changeUsername}
          placeholder="Введите имя пользователя"
        />
        <Input
          value={password}
          type={'password'}
          label={'Введите Пароль'}
          onChange={changePassword}
          placeholder="Введите Пароль"
        />
        <button className={styles.button}>Войти</button>
      </form>
    </Container>
  );
};

export { LoginContainer };
