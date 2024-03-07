import { default as ApplicationInitializer } from './main.app';
import main from './styles/themes/main/main.theme';
import ice from './styles/themes/ice/ice.theme';
import './styles/themes/main/index.scss';
import '@qubejs/ui-material-base/src/styles/index.scss';

// import * as uiMaterial from '@qubejs/ui-material-base/components.lazy.esm';
// import * as uiMaterial from '@qubejs/ui-material-base/basic.esm';
// import * as uiContent from '@qubejs/ui-material-base/content.esm';
// import * as uiData from '@qubejs/ui-material-base/data.esm';

const themeMap = {
  main,
  ice,
};

ApplicationInitializer({
  themes: themeMap,
});
