// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
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
import { containers, storage, utils, ThemeProvider } from '@qubejs/web-react';
import { Provider } from 'react-redux';
// import { ThemeProvider } from '@emotion/react';
import app_containers from '../containers';
import app_templates from '../templates';
import { useEffect } from 'react';
import { store } from '../redux';
import config from '../config';
import theme from '../styles/themes/main/main.theme';

const { DynamicContent, Application } = containers;

storage.containers.set(containers);
storage.containers.set(app_containers);
storage.containers.set(app_templates);
utils.redirect.setUrlMapping(config.urlMapping);

export function App() {
  const navigate = useNavigate();
  const params = useParams();
  const [currentTheme, setTheme] = useState('main');
  const [inProgress, setInProgress] = useState(false);
  const { Snackbar } = storage.components.get();
  const location = useLocation();
  useEffect(() => {
    utils.redirect.setNavigate(navigate);
  }, []);
  const onThemeChange = (newTHeme: string) => {
    if (newTHeme !== currentTheme) {
      console.log(`${currentTheme} changed to : ${newTHeme}`);
      setTheme(newTHeme);
      setInProgress(true);
      let itemFound;
      let regExMatch: any;
      for (let i = 0; i < document.head.children.length; i++) {
        const item = document.head.children[i] as HTMLLinkElement;
        regExMatch = item.href?.match('/(.*)/(.*).([0-9].[0-9].[0-9].css)$');
        if (item?.tagName === 'LINK' && item?.href && regExMatch) {
          itemFound = item;
          break;
        }
      }
      if (itemFound && currentTheme !== regExMatch[2]) {
        itemFound.setAttribute(
          'href',
          [`/${currentTheme}.`, regExMatch[3]].join('')
        );
        document.head.appendChild(itemFound);
      } else {
        const elem = document.createElement('link');
        elem.setAttribute('rel', `stylesheet`);
        elem.setAttribute(
          'href',
          `/static/css/${newTHeme}.${utils.win.getWindow().APP_CONFIG.appVersion}.css`
        );
        document.head.appendChild(elem);
      }
      setTimeout(() => {
        setInProgress(false);
      }, 500);
    }
  };
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Application>
            <Routes>
              {/* <Route path="/" element={<NxWelcome title='Hello' />} /> */}
              <Route path="/ho/*" element={<DynamicContent onThemeChange={onThemeChange} />} />
              <Route path="*" element={<Navigate to="/ho/home" />} />
            </Routes>
          </Application>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
