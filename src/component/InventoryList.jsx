import { useContext } from "react";
import Shoectx from "../store/shoectx";

const InventoryList = (props) => {
    const ctx = useContext(Shoectx)

    const addtocarthandler = (event) => {
        let s = event.target.innerText.split(' ')
        const item = {
            id: props.p._id,
            size: s[1]
        }
        const isInCartIdx = ctx.cart.findIndex(c => c.pid === props.p._id)
        const cartItem = ctx.cart[isInCartIdx]
        if (cartItem) {
            if (item.size === 'L') {
                cartItem.sizel += 1
            }
            if (item.size === 'M') {
                cartItem.sizem += 1
            }
            if (item.size === 'S') {
                cartItem.sizes += 1
            }
            const { _id } = cartItem
            // delete cartItem._id
            const newobj = {
                pid: cartItem.pid,
                shoename: cartItem.shoename,
                price: cartItem.price,
                sizel: cartItem.sizel,
                sizem: cartItem.sizem,
                sizes: cartItem.sizes
            }
            fetch(`${ctx.crudurl}/carts/${_id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newobj),
            })
                .then(res => {
                    return res.json()
                })
                .then(d => {
                    console.log(d)
                    // ctx.addtocart(d)
                })
                .catch(err => {
                    console.log(err.message)
                })
            ctx.totalamountHandler(newobj.price)
        }
        else {
            const prodIdx = ctx.products.findIndex(p => p._id === props.p._id)
            const prod = ctx.products[prodIdx]

            const newobj = {
                pid: prod._id,
                shoename: prod.shoename,
                price: prod.price,
                sizel: 0,
                sizem: 0,
                sizes: 0
            }
            if (item.size === 'L') {
                newobj.sizel = 1
            }
            if (item.size === 'M') {
                newobj.sizem = 1
            }
            if (item.size === 'S') {
                newobj.sizes = 1
            }

            fetch(`${ctx.crudurl}/carts`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newobj),
            })
                .then(res => {
                    return res.json()
                })
                .then(d => {
                    ctx.addtocart(d)
                })
                .catch(err => {
                    console.log(err.message)
                })

        }
        // ctx.addtocart(item)
    }
    return (
        <tr>
            <th scope="row">{props.p.shoename}</th>
            <td>{props.p.description}</td>
            <td>{props.p.price}</td>
            <td>{props.p.sizel !== 0 ? <button onClick={addtocarthandler} className="btn btn-primary">Buy L <span>{props.p.sizel}</span></button>
                : <button className="btn btn-primary" disabled>Buy L <span>0</span></button>}
            </td>
            <td>{props.p.sizem !== 0 ? <button onClick={addtocarthandler} className="btn btn-primary">Buy M <span>{props.p.sizem}</span></button>
                : <button className="btn btn-primary" disabled>Buy L <span>0</span></button>}
            </td>
            <td>{props.p.sizes !== 0 ? <button onClick={addtocarthandler} className="btn btn-primary">Buy S <span>{props.p.sizes}</span></button>
                : <button className="btn btn-primary" disabled>Buy L <span>0</span></button>}
            </td>
        </tr>
    )
}

export default InventoryList;