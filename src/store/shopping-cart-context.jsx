import { createContext, useReducer, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";
export const ShoppingCartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const updatedItems = [...state.items];
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find(
          (product) => product.id === action.payload.id
        );

        if (!product) {
          return state;
        }

        updatedItems.push({
          id: action.payload.id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    case "UPDATE_QUANTITY":
      const updatedItemsForQuantity = [...state.items];
      const updatedItemIndex = updatedItemsForQuantity.findIndex(
        (item) => item.id === action.payload.productId
      );

      if (updatedItemIndex === -1) {
        return state;
      }

      const updatedItem = {
        ...updatedItemsForQuantity[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity <= 0) {
        updatedItemsForQuantity.splice(updatedItemIndex, 1);
      } else {
        updatedItemsForQuantity[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItemsForQuantity,
      };
    default:
      return state;
  }
}   

export default function ShoppingCartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartStateDispatch] = useReducer(shoppingCartReducer, {
    items: [],
  });
  function handleAddItemToCart(id) {
    shoppingCartStateDispatch({ type: "ADD_ITEM", payload: { id } });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartStateDispatch({ type: "UPDATE_QUANTITY", payload: { productId, amount } });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
  };
  return (
    <ShoppingCartContext.Provider value={ctxValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
