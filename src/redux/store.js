import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import productSlice from './productSlice';
import FilterSlice from './FilterSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        product: productSlice,
        filter: FilterSlice
    },
})