import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { cordova } from '@qubejs/web-react';
import App from './app/app';
import './styles/themes/main/index.scss';

class AppRoot {
  initialize(config: any) {
    this.bindEvents(config);
  }
  bindEvents(config: any) {
    document.addEventListener(
      'deviceready',
      () => this.onDeviceReady(undefined, config),
      false
    );
  }
  initApp() {}
  onDeviceReady(direct?: boolean, { themes, ...options }: any = {}) {
    if (!direct) {
      this.initApp();
    }
    console.log('app initialized')
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );
    const RouterToUse = cordova.isApp() ? HashRouter : BrowserRouter;
    root.render(
      <RouterToUse>
        <App themes={themes} />
      </RouterToUse>
    );
  }
}

export default (config: any = {}) => {
  if (cordova.isApp()) {
    new AppRoot().initialize(config);
  } else {
    new AppRoot().onDeviceReady(true, config);
  }
  const setFullHeight = () => {
    const item: any = document.querySelector(':root');
    item?.style?.setProperty('--vh', window.innerHeight / 100 + 'px');
  };
  window.addEventListener('resize', () => {
    setFullHeight();
  });
  setFullHeight();
};
