// import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';


// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: [  
//     {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//     {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//     {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//     {id: 'id-4', name: 'Annie Copeland', number:'227-91-26'},],
//   reducers: {
//     addContact: {
//       reducer(state, action) {
//         state.push(action.payload);
//       },
//       prepare(name, number) {
//         return {
//           payload: {
//             id: nanoid(),
//             name,
//             number,
//           },
//         };
//       },
//     },
//     removeContact(state, action) {
//       return [...state.filter(contact => contact.id !== action.payload)];
//     },
//   },
// });
// export const { addContact, removeContact } = contactsSlice.actions;
// export const contactsReducer = contactsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations.js';


const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null    
  },
  extraReducers: {
    [fetchContacts.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        items: [...payload],
        isLoading: false,
        error: null,
      };
    },
    [fetchContacts.pending]: state => {
      return { ...state, isLoading: true };
    },
    [fetchContacts.rejected]: (state, { payload }) => {
      return { ...state, error: payload, isLoading: false };
    },

    [addContact.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        items: [...state.items, payload],
        isLoading: false,
        error: null,
      };
    },
    [addContact.pending]: state => {
      return { ...state, isLoading: true };
    },
    [addContact.rejected]: (state, { payload }) => {
      return { ...state, error: payload, isLoading: false };
    },

    [deleteContact.fulfilled]: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        items: [...state.items.filter(item => item.id !== payload.id)],
        isLoading: false,
      };
    },
    [deleteContact.pending]: state => {
      return { ...state, isLoading: true };
    },
    [deleteContact.rejected]: (state, { payload }) => {
      return { ...state, error: payload };
    },      
  }
});



export const contactsReducer = contactsSlice.reducer;