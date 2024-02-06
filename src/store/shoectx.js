import React from "react";

const Shoectx = React.createContext({
products:[],
cart:[],
noofitem:0,
totalamount:0,
addtocart:(item)=>{},
addproduct:(item)=>{},
purchase:()=>{}
})

export default Shoectx;