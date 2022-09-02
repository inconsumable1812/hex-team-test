import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'src/app/hooks';
import { REQUEST_STATUS } from 'src/shared/helpers/redux';

import { selectLogin } from './redux/slice';
import { Container } from './view/Container';

type Props = {};

const Login: FC<Props> = () => {
  const { status, error } = useAppSelector(selectLogin);
  const navigate = useNavigate();

  switch (status) {
    case REQUEST_STATUS.idle: {
      return <Container />;
    }
    case REQUEST_STATUS.pending: {
      return <Container showLoading />;
    }
    case REQUEST_STATUS.fulfilled: {
      navigate('/home');
      return null;
    }
    case REQUEST_STATUS.rejected: {
      return <p>{error}</p>;
    }
    default: {
      return null;
    }
  }
};

export { Login };
