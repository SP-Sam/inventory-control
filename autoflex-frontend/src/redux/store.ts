import { configureStore } from '@reduxjs/toolkit';
import { rawMaterialReducer } from './rawMaterialSlice';

const store = configureStore({
  reducer: {
    rawMaterial: rawMaterialReducer,
  },
});

export { store };
