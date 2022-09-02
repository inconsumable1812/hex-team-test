import { FC } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Login } from 'src/features/login';
import { Main } from 'src/features/main/Main';
import { Register } from 'src/features/register';
import { Mock } from 'src/shared/components';

type Props = {};

const RoutesSwitcher: FC<Props> = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<Login></Login>} />
      <Route path="main" element={<Main></Main>} />
      <Route path="register" element={<Register></Register>} />
      <Route path="*" element={<Mock></Mock>} />
    </Routes>
  </BrowserRouter>
);

export default RoutesSwitcher;
