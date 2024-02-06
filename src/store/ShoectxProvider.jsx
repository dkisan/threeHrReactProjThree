import { useReducer } from "react"
import Shoectx from "./shoectx"

const initial = {

    products: [
        {
            id: 123,
            shoename: 'abc',
            description: 'djfslj',
            price: 123,
            sizes: 8,
            sizem: 8,
            sizel: 8,
        }, {
            id: 57,
            shoename: 'abc',
            description: 'djfslj',
            price: 123,
            sizes: 8,
            sizem: 8,
            sizel: 8,
        }
    ],
    cart: [],
    totalamount: 0,
    noofitem: 0
}

const shoeReducer = (state, action) => {

    if (action.type === 'addtocart') {
        const isExistindex = state.cart.findIndex(p => p.id === action.item.id)
        const item = state.cart[isExistindex]
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
            const itemIdx = state.products.findIndex(p => p.id === action.item.id)
            const item = state.products[itemIdx]
            const newobj = {
                id: item.id,
                shoename: item.shoename,
                price: item.price,
                sizel: 0,
                sizem: 0,
                sizes: 0
            }
            if (action.item.size === 'L') {
                newobj.sizel = 1
            }
            if (action.item.size === 'M') {
                newobj.sizem = 1
            }
            if (action.item.size === 'S') {
                newobj.sizes = 1
            }
            update = [...state.cart]
            update[itemIdx] = newobj
            amount = state.totalamount + newobj.price
        }
        return {
            products: state.products,
            cart: update,
            totalamount: amount,
            noofitem: state.noofitem + 1
        }
    }

    if (action.type === 'addproduct') {

        action.item.id = 234343
        return {
            products: state.products.concat(action.item),
            cart: state.cart,
            totalamount: state.totalamount + action.item,
            noofitem: state.noofitem
        }
    }

    if (action.type === 'purchase') {
        if(state.cart.length > 0){
            console.log('Thanks for Purchase')
        }
        return {
            products: state.products,
            cart: [],
            totalamount: 0,
            noofitem: 0
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

    const shoeVal = {
        products: shoestate.products,
        cart: shoestate.cart,
        noofitem: shoestate.noofitem,
        totalamount: shoestate.totalamount,
        addtocart: addtocart,
        addproduct: addproduct,
        purchase: purchase
    }

    return (
        <Shoectx.Provider value={shoeVal}>
            {props.children}
        </Shoectx.Provider>
    )
}

export default ShoectxProvider;