import React from "react";

const Shoectx = React.createContext({
    crudurl: '',
    products: [],
    cart: [],
    noofitem: 0,
    totalamount: 0,
    addtocart: (item) => { },
    addproduct: (item) => { },
    purchase: () => { },
    totalamountHandler: (amount) => { }
})

export default Shoectx;