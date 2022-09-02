import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { REQUEST_STATUS } from 'src/shared/helpers/redux';

import { selectLogin, statusReset } from './redux/slice';
import { LoginContainer } from './view/LoginContainer';
import styles from './Login.module.scss';
import { Container } from 'src/shared/components';

type Props = {};

const Login: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectLogin);
  const navigate = useNavigate();
  const reset = () => {
    dispatch(statusReset());
  };

  switch (status) {
    case REQUEST_STATUS.idle: {
      return <LoginContainer />;
    }
    case REQUEST_STATUS.pending: {
      return <LoginContainer showLoading />;
    }
    case REQUEST_STATUS.fulfilled: {
      navigate('/main', { replace: true });
      return (
        <Container>
          <h1>Вы уже вошли!</h1>
          <Link to={'/main'}>На главную</Link>
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

export { Login };
