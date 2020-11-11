import { configureStore } from '@reduxjs/toolkit';
import { AuthReducer } from './components';

export default configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
