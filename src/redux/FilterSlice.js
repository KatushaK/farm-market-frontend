import { createSlice } from '@reduxjs/toolkit';


export const filterSlice = createSlice({
    name: "filter",
    initialState: {
        selectedCategory: 'all'
    },
    reducers: {
        filterCategory: (state, action) => {
            state.selectedCategory = action.payload
        }
    }
})
export const getSelectedCategory = state => state.filter.selectedCategory;
export const {filterCategory} = filterSlice.actions
export default filterSlice.reducer