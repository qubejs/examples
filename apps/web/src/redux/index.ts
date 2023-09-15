import { configureStore } from '@reduxjs/toolkit';
import 'whatwg-fetch';
import { reducers } from '@qubejs/web-react';

const store = configureStore({
  reducer: {
    ...reducers.default,
  },
});

export { store };
