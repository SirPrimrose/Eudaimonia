/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
  messages: [],
};

export const textLogSlice = createSlice({
  name: 'textLog',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.unshift({ id: uuid(), text: action.payload });
    },
    clearMessages: (state) => {
      state.messages = initialState.messages;
    },
  },
});

export const getTextLogMessages = (store) => store.textLog.messages;

export const { actions } = textLogSlice;

export default textLogSlice.reducer;
