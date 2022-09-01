import { FC } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Login } from 'src/features/login';

type Props = {};

const RoutesSwitcher: FC<Props> = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<Login></Login>} />
      <Route path="home" element={<p>home</p>} />
    </Routes>
  </BrowserRouter>
);

export default RoutesSwitcher;
