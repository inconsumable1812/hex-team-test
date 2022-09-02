import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { REQUEST_STATUS } from 'src/shared/helpers/redux';
import { selectLogin } from '../login/redux/selectors';

import { selectLinkObjects } from './redux/slice';
import { getStatistics } from './redux/thunks';
import { Container } from './view/Container';

type Props = {};

const Main: FC<Props> = () => {
  const { status, error } = useAppSelector(selectLinkObjects);
  const { token_type, access_token } = useAppSelector(selectLogin);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (access_token === null || token_type === null) {
    navigate('/');
  }

  useEffect(() => {
    if (access_token === null || token_type === null) return;
    dispatch(getStatistics({ access_token, token_type }));
  }, [access_token, dispatch, token_type]);

  switch (status) {
    case REQUEST_STATUS.pending: {
      // return <p>load</p>;
      return <Container showLoading />;
    }
    case REQUEST_STATUS.fulfilled: {
      // return <p>loaded</p>;
      return <Container />;
    }
    case REQUEST_STATUS.rejected: {
      return <p>{error}</p>;
    }
    default: {
      return null;
    }
  }
};

export { Main };
