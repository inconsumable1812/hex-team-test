import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { REQUEST_STATUS } from 'src/shared/helpers/redux';

import { selectRegister, statusReset } from './redux/slice';
import { RegisterContainer } from './view/RegisterContainer';
import styles from './Register.module.scss';
import { Container } from 'src/shared/components';

type Props = {};

const Register: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectRegister);
  const reset = () => {
    dispatch(statusReset());
  };

  switch (status) {
    case REQUEST_STATUS.idle: {
      return <RegisterContainer />;
    }
    case REQUEST_STATUS.pending: {
      return <RegisterContainer showLoading />;
    }
    case REQUEST_STATUS.fulfilled: {
      return (
        <Container>
          <h1 className={styles.heading}>Регистрация прошла успешно</h1>
          <nav className={styles.nav}>
            <Link className={styles.link} to={'/'}>
              Войти
            </Link>
          </nav>
        </Container>
      );
    }
    case REQUEST_STATUS.rejected: {
      return (
        <div className={styles.errorContainer}>
          <p className={styles.error}>{error}</p>
          <button className={styles.errorButton} onClick={reset}>
            Попробовать ещё раз
          </button>
        </div>
      );
    }
    default: {
      return null;
    }
  }
};

export { Register };
