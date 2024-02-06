import { useReducer } from "react"
import Shoectx from "./shoectx"

const initial = {
    crudurl: 'https://crudcrud.com/api/ed92fcfeb4bf474891ab17dbacfbd6e8',
    products: [
        // {
        //     id: 123,
        //     shoename: 'abc',
        //     description: 'djfslj',
        //     price: 123,
        //     sizes: 8,
        //     sizem: 8,
        //     sizel: 8,
        // }, {
        //     id: 57,
        //     shoename: 'abc',
        //     description: 'djfslj',
        //     price: 123,
        //     sizes: 8,
        //     sizem: 8,
        //     sizel: 8,
        // }
    ],
    cart: [],
    totalamount: 0,
    noofitem: 0
}

const shoeReducer = (state, action) => {

    if (action.type === 'addtocart') {
        //API
        const isExistindex = state.cart.findIndex(p => p._id === action.item._id)
        const item = state.cart[isExistindex]
        // console.log(action.item, isExistindex)
        let amount = state.totalamount
        let update;
        if (item) {
            if (action.item.size === 'L') {
                item.sizel = item.sizel + 1
            }
            if (action.item.size === 'M') {
                item.sizem = item.sizem + 1
            }
            if (action.item.size === 'S') {
                item.sizes = item.sizes + 1
            }
            update = [...state.cart]
            update[isExistindex] = item
            amount = amount + item.price
        } else {
            update = [...state.cart]
            update.push(action.item)
            amount = state.totalamount + action.item.price
        }

        return {
            crudurl: state.crudurl,
            products: state.products,
            cart: update,
            totalamount: state.totalamount,
            // totalamount: amount,
            noofitem: state.noofitem + 1
        }
    }

    // if (action.type === 'addtocart') {
    //     const isExistindex = state.cart.findIndex(p => p._id === action.item.id)
    //     const item = state.cart[isExistindex]
    //     let amount = state.totalamount
    //     let update;
    //     if (item) {
    //         if (action.item.size === 'L') {
    //             item.sizel = item.sizel + 1
    //         }
    //         if (action.item.size === 'M') {
    //             item.sizem = item.sizem + 1
    //         }
    //         if (action.item.size === 'S') {
    //             item.sizes = item.sizes + 1
    //         }
    //         update = [...state.cart]
    //         update[isExistindex] = item
    //         amount = amount + item.price
    //     } else {
    //         const itemIdx = state.products.findIndex(p => p._id === action.item.id)
    //         const item = state.products[itemIdx]
    //         const newobj = {
    //             _id: item._id,
    //             shoename: item.shoename,
    //             price: item.price,
    //             sizel: 0,
    //             sizem: 0,
    //             sizes: 0
    //         }
    //         if (action.item.size === 'L') {
    //             newobj.sizel = 1
    //         }
    //         if (action.item.size === 'M') {
    //             newobj.sizem = 1
    //         }
    //         if (action.item.size === 'S') {
    //             newobj.sizes = 1
    //         }
    //         update = [...state.cart]
    //         update.push(newobj)
    //         amount = state.totalamount + newobj.price
    //     }

    //     return {
    //         crudurl: state.crudurl,
    //         products: state.products,
    //         cart: update,
    //         totalamount: amount,
    //         noofitem: state.noofitem + 1
    //     }
    // }

    if (action.type === 'addproduct') {

        return {
            crudurl: state.crudurl,
            products: state.products.concat(action.item),
            cart: state.cart,
            totalamount: state.totalamount,
            noofitem: state.noofitem
        }
    }

    if (action.type === 'purchase') {
        if (state.cart.length > 0) {
            console.log('Thanks for Purchase')
        }
        return {
            crudurl: state.crudurl,
            products: state.products,
            cart: [],
            totalamount: 0,
            noofitem: 0
        }
    }

    if (action.type === 'totalamount') {

        return {
            crudurl: state.crudurl,
            products: state.products,
            cart: state.cart,
            totalamount: state.totalamount + action.amount,
            noofitem: state.noofitem
        }
    }

}

const ShoectxProvider = (props) => {
    const [shoestate, dispatch] = useReducer(shoeReducer, initial)

    const addtocart = (item) => {
        dispatch({ type: 'addtocart', item })
    }
    const addproduct = (item) => {
        dispatch({ type: 'addproduct', item: item })
    }
    const purchase = () => {
        dispatch({ type: 'purchase' })
    }

    const totalamountHandler = (amount) => {
        dispatch({ type: 'totalamount', amount: amount })
    }

    const shoeVal = {
        crudurl: shoestate.crudurl,
        products: shoestate.products,
        cart: shoestate.cart,
        noofitem: shoestate.noofitem,
        totalamount: shoestate.totalamount,
        addtocart: addtocart,
        addproduct: addproduct,
        purchase: purchase,
        totalamountHandler:totalamountHandler
    }

    return (
        <Shoectx.Provider value={shoeVal}>
            {props.children}
        </Shoectx.Provider>
    )
}

export default ShoectxProvider;