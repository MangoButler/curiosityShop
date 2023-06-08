import React, { useReducer, useState } from "react";

const cartContext = React.createContext({
  currentItems: [],
  onAddItem: (item) => {},
  onRemoveItem: (item) => {},
  onPlaceOrder: () => {},
  placedOrder: false,
  setPlacedOrder: () => {},
});

const currentItemsReducer = (state, action) => {
//   if (action.type === "ITEM_ADDED") {
//     for (let item of state) {
//       if (item.name === action.item.name) {
//         item.amount += action.item.amount;
//         return state;
//       }
//     }
//     state.push(action.item);
//     return state;
//   }

  if (action.type === "ITEM_ADDED") {
    if (state.some(item => item.name === action.item.name)) {
      return state.map((item) => {
        if (item.name === action.item.name) {
          item.amount += action.item.amount;
        }
        return item;
      });
    } 
    return [ ...state, action.item ]
    
  }

//   if (action.type === "ITEM_REMOVED") {
//     for (let item of state) {
//       if (item.name === action.item.name) {
//         item.amount += action.item.amount;
//         if (item.amount < 1) {
//           state.splice(
//             state.findIndex((obj) => obj.name === item.name),
//             1
//           );
//         }
//         return state;
//       }
//     }
//     return state;
//   }

if (action.type === "ITEM_REMOVED") {
    if (state.some(item => item.name === action.item.name)) {
        const newArray = state.map((item) => {
          if (item.name === action.item.name) {
            item.amount += action.item.amount;
          }
          return item;
        });
        return newArray.filter(item => item.amount > 0);
      } 
    return state;
  }

  if (action.type === "ORDER_PLACED") {
    console.log("Ordering", state);
    return [];
  }
};

export const CartContextProvider = (props) => {
  const [currentItems, dispatchCurrentItems] = useReducer(
    currentItemsReducer,
    []
  );
  const [placedOrder, setPlacedOrder] = useState(false);

  const addItemHandler = (item) => {
    dispatchCurrentItems({ type: "ITEM_ADDED", item: item });
  };
  const removeItemHandler = (item) => {
    dispatchCurrentItems({ type: "ITEM_REMOVED", item: item });
  };

  const placeOrderHandler = () => {
    dispatchCurrentItems({ type: "ORDER_PLACED" });
    setPlacedOrder(2);
  };

  return (
    <cartContext.Provider
      value={{
        currentItems: currentItems,
        onAddItem: addItemHandler,
        onRemoveItem: removeItemHandler,
        onPlaceOrder: placeOrderHandler,
        placedOrder: placedOrder,
        setPlacedOrder: setPlacedOrder,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
};
export default cartContext;
