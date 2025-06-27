import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity, instructions = "") => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name && cartItem.price === item.price);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name && cartItem.price === item.price
            ? { ...cartItem, quantity: cartItem.quantity + quantity, instructions }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity, instructions }];
    });
  };

  const removeFromCart = (itemName, itemPrice) => {
    setCart((prevCart) => prevCart.filter((cartItem) => !(cartItem.name === itemName && cartItem.price === itemPrice)));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);