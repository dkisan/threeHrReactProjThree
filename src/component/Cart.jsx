import { useContext } from 'react'
import ReactDOM from 'react-dom'
import Shoectx from '../store/shoectx'

const CartItem = (props) => {
    console.log(props)
    return (
        <tr>
            <th scope="row">{props.item.shoename}</th>
            <td className='d-flex gap-1'>
                {props.item.sizes > 0 && <span className='border p-1'>S x{props.item.sizes}</span>}
                {props.item.sizem > 0 && <span className='border p-1'>M x{props.item.sizem}</span>}
                {props.item.sizel > 0 && <span className='border p-1'>L x{props.item.sizel}</span>}
            </td>
            <td>Rs.{props.item.price}</td>
        </tr>
    )
}

const CartPage = (props) => {
    const ctx = useContext(Shoectx)
    console.log(ctx.totalamount)
    return (
        <div onClick={props.cartHandler} className='w-100 h-100 position-absolute top-0 start-0 bg-dark bg-opacity-10 d-flex justify-content-center align-items-center'>
            <div onClick={event => event.stopPropagation()}>
                <table className="table">
                    <thead>
                        {ctx.noofitem !== 0 &&
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                            </tr>
                        }
                    </thead>
                    <tbody>
                        {
                            ctx.noofitem !== 0 && ctx.cart.map((c, i) => {
                                return <CartItem item={c} key={i} />
                            })
                        }
                        {ctx.noofitem !== 0 &&
                            < tr >
                                <td></td>
                                <td>Total</td>
                                <td>{ctx.totalamount}</td>
                            </tr>
                        }
                        {ctx.noofitem !== 0 &&
                            <tr>
                                <td></td>
                                <td><button onClick={ctx.purchase} className="btn btn-primary">Place Order</button></td>
                                <td><button onClick={props.cartHandler} className="btn btn-danger">Cancel</button></td>
                            </tr>
                        }
                        {ctx.noofitem === 0 &&
                            <tr>
                                <td colSpan={3} className='p-5'>No Products Added...</td>
                            </tr>}
                    </tbody>
                </table>
            </div>
        </div >

    )
}

const Cart = (props) => {

    return (ReactDOM.createPortal(<CartPage cartHandler={props.cartHandler} />, document.getElementById('ovlay')))
}
export default Cart;