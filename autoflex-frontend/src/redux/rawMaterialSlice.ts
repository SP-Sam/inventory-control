import { createSlice } from '@reduxjs/toolkit';
import { IRawMaterial } from '../interfaces/rawMaterialsInterfaces';

const initialState: IRawMaterial[] = [];

interface RootState {
  rawMaterial: IRawMaterial[];
}

export const slice = createSlice({
  name: 'rawMaterial',
  initialState,
  reducers: {
    initRawMaterials(_state, { payload }) {
      return [...payload];
    },
    removeRawMaterial(state, { payload }) {
      return [...state.filter(rm => rm.code !== payload.code)];
    },
  },
});

export const { removeRawMaterial, initRawMaterials } = slice.actions;

export const selectRawMaterials = (state: RootState) => state.rawMaterial;

export const rawMaterialReducer = slice.reducer;
