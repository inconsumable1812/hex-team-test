import { FC } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Login } from 'src/features/login';
import { Main } from 'src/features/main/Main';

type Props = {};

const RoutesSwitcher: FC<Props> = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<Login></Login>} />
      <Route path="home" element={<Main></Main>} />
    </Routes>
  </BrowserRouter>
);

export default RoutesSwitcher;
