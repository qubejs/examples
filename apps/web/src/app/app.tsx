// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
  // RouterProvider,
  // createHashRouter,
} from 'react-router-dom';
import { containers, utils } from '@qubejs/web-react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import NxWelcome from './nx-welcome';
import { useEffect } from 'react';
import { store } from '../redux';
import theme from '../styles/themes/main/main.theme';

const { DynamicContent } = containers;

export function App() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  useEffect(() => {
    utils.redirect.setNavigate(navigate);
  }, []);
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<NxWelcome title="web" />} />
            <Route
              path="/ho/*"
              element={<DynamicContent location={location} params={params} />}
            />
            <Route element={<Navigate to="/ho/park" />} />
          </Routes>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
