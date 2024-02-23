import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const initialState = {
    productList: [],
    cartItem: []
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.productList = [...action.payload]
        },

        addItemToCart: (state, action) => {
            const check = state.cartItem.some((el) => el._id === action.payload._id)
            if (check) {
                toast("This item was already added to cart")
            } else {
                toast("Item is added to cart")
                const total = action.payload.price
                state.cartItem = [...state.cartItem, {...action.payload, quantity: 1, total: total}]
            }
        },

        deleteCartItem: (state, action) => {
            toast("Item has been deleted")
            state.cartItem = state.cartItem.filter(el => el._id !== action.payload)
        },

        increaseQuantity: (state, action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload)
            let quantity = state.cartItem[index].quantity
            const newQuantity = ++quantity 
            state.cartItem[index].quantity = newQuantity
            
            const price = state.cartItem[index].price
            const total = price * newQuantity
            state.cartItem[index].total = total.toFixed(2)
        },

        decreaseQuantity: (state, action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload)
            let quantity = state.cartItem[index].quantity
            if(quantity > 1) {
                const newQuantity = --quantity 
                state.cartItem[index].quantity = newQuantity
                
                const price = state.cartItem[index].price
                const total = price * newQuantity
                state.cartItem[index].total = total.toFixed(2)
            }
        }
    }
})

        
export const { setDataProduct, addItemToCart, deleteCartItem, increaseQuantity, decreaseQuantity} = productSlice.actions
export default productSlice.reducer