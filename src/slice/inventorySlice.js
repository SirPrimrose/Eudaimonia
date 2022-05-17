/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ITEM_BASES } from '../game/data/inventory';

const initialState = {
  items: ITEM_BASES,
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const { name, amount } = payload;
      const item = state.items[name];

      item.currentAmount = Math.min(
        item.maxAmount,
        item.currentAmount + amount
      );
    },
    removeItem: (state, { payload }) => {
      const { name, amount } = payload;
      const item = state.items[name];

      item.currentAmount = Math.max(0, item.currentAmount - amount);
    },
  },
});

export const getInventory = (store) => store.inventory.items;

export const getItemByName = (store) => (itemName) =>
  getInventory(store)[itemName];

export const { actions } = inventorySlice;

export default inventorySlice.reducer;
