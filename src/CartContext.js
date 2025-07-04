import { createContext, useContext, useState, useEffect } from "react";

// CartContext create karo jisme poora cart data aur functions save honge
const CartContext = createContext();

// CartProvider component banaya jata hai jo app me cart ki state provide karega
export const CartProvider = ({ children }) => {
  // Cart state ko initialize karo localStorage se, agar wahan kuch saved hai to use lo warna empty array
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Jab bhi cart state change ho, usay localStorage me save kar do
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Cart me item add karne ka function, agar same item pehle se hai to quantity badhao warna naya item add karo
  const addToCart = (item, quantity, instructions = "") => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.name === item.name && cartItem.price === item.price
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name && cartItem.price === item.price
            ? {
                ...cartItem,
                quantity: cartItem.quantity + quantity,
                instructions, // instructions update karenge
              }
            : cartItem
        );
      }
      // Agar item nahi mila, to naya item add karo
      return [...prevCart, { ...item, quantity, instructions }];
    });
  };

  // Cart se item remove karne ka function
  const removeFromCart = (itemName, itemPrice) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) =>
          !(cartItem.name === itemName && cartItem.price === itemPrice)
      )
    );
  };

  // Context provider return karo jisme cart aur add/remove functions accessible hain
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook jo dusri files me use karke context easily access kar sakte hain
export const useCart = () => useContext(CartContext);
