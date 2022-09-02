import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { REQUEST_STATUS } from 'src/shared/helpers/redux';
import { selectLogin } from '../login/redux/selectors';

import { selectLinkObjects } from './redux/slice';
import { getStatistics } from './redux/thunks';
import { MainContainer } from './view/MainContainer';

type Props = {};

const Main: FC<Props> = () => {
  const { status, error } = useAppSelector(selectLinkObjects);
  const { token_type, access_token } = useAppSelector(selectLogin);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (access_token === null || token_type === null) {
      navigate('/');
      return;
    }
    dispatch(getStatistics({ access_token, token_type }));
  }, [access_token, dispatch, navigate, token_type]);

  switch (status) {
    case REQUEST_STATUS.pending: {
      return <MainContainer showLoading />;
    }
    case REQUEST_STATUS.fulfilled: {
      return <MainContainer />;
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
