import { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
	items: [],
	totalAmount: 0,
}

const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount

		//? if new added item is already in state.items we are getting its index
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		)

		//? we are getting the item which is already present in state.items at index which we find recently
		const existingItem = state.items[existingCartItemIndex]

		let updatedItems

		//? we are checking if we successfully find our item
		if (existingItem) {
			//? now we are creating the object of single item which we added and also present in previous state
			//? and updating its only amount by 1
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount + action.item.amount,
			}
			console.log(existingItem.amount + '\n' + action.item.amount)

			//? we are getting all items from state.items
			updatedItems = [...state.items]

			//? just replacing the item we find with new updatedItem
			updatedItems[existingCartItemIndex] = updatedItem
		} else {
			//? if we didnot find any item with same id then just adding new item to state item
			updatedItems = state.items.concat(action.item) //? unlike push it does not edit orginal array although it returns new array after push we using so our main array stays immutable "GOOD Practice"
		}

		//! Note: we are not changing the direct state.items although we can do it
		//! we are pasting its content to new variables so it can stay immutable

		//?just updating the state with new values
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		}
	}

	if (action.type === 'REMOVE') {
		let updatedItems

		const existingItemIndex = state.items.findIndex(
			(item) => action.id === item.id
		)
		const existingItem = state.items[existingItemIndex]

		const updatedTotalAmount = state.totalAmount - existingItem.price

		if (existingItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id)
		} else {
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount - 1,
			}
			updatedItems = [...state.items]
			updatedItems[existingItemIndex] = updatedItem
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		}
	}

	if (action.type === 'CLEAR') {
		return defaultCartState
	}

	return defaultCartState
}

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	)

	const addItemToCartHandler = (item) => {
		dispatchCartAction({
			type: 'ADD',
			item: item,
		})
	}

	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({
			type: 'REMOVE',
			id: id,
		})
	}

	const clearCartHandler = () => {
		dispatchCartAction({ type: 'CLEAR' })
	}

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		clearCart: clearCartHandler,
	}

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	)
}

export default CartProvider
