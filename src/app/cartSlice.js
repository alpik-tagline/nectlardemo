import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    favourites: [],
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(p => p.id === item.id);

      if (existingItem) {
        existingItem.quantity = item.quantity;
      } else {
        state.items.push(item);
      }
    },

    favourite: (state, action) => {
      const alreadyFavourited = state.favourites.find(
        item => item.id === action.payload.id,
      );
      if (!alreadyFavourited) {
        state.favourites.push(action.payload);
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter(
        item => item.id !== action.payload,
      );
    },

    // Adding the addMultipleItems action to add multiple products to the cart
    addMultipleItems: (state, action) => {
      // Use a Set to avoid duplicates based on item.id
      const newItems = action.payload;
      newItems.forEach(item => {
        const existingItem = state.items.find(p => p.id === item.id);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          state.items.push(item);
        }
      });
    },
  },
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  favourite,
  removeFavourite,
  addMultipleItems, // Export the new action
} = cartSlice.actions;

export default cartSlice.reducer;
