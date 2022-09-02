import { FC, SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { Container, Input, Loader } from 'src/shared/components';
import { register } from '../redux/thunks/register';
import styles from './RegisterContainer.module.scss';

type Props = {
  showLoading?: boolean;
};

const RegisterContainer: FC<Props> = ({ showLoading = false }) => {
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
    if (username.trim().length !== 0 && password.length !== 0) {
      dispatch(register({ username, password }));
    }
  };

  return (
    <Container>
      <h1 className={styles.heading}>Регистрация аккаунта</h1>
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
        <button className={styles.button}>Зарегистрировать</button>
      </form>
      <nav className={styles.nav}>
        <Link to="/">Войти</Link>
      </nav>
    </Container>
  );
};

export { RegisterContainer };
