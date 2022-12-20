import { createContext, useState, useEffect } from "react";

const addCardItem = (cartItems, productToAdd) => {
    // find if product exists.
    let productExists = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    // yes, increment qty

    if (productExists) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            { ...cartItem, quantity: cartItem.quantity + 1 } :
            cartItem
        );
    }
    //no, add to array with qty 1
    // return new array with modified quantities
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemtoCart: () => { },
    cartCount: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCardItem(cartItems, productToAdd));
    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };


    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}