import { useContext, useEffect, useState } from 'react'
import './App.css'
import Cart from './component/Cart'
import CartBtn from './component/CartBtn'
import Form from './component/Form'
import Inventory from './component/Inventory'
import Shoectx from './store/shoectx'

function App() {

  const [showCart, setShowcart] = useState(false)

  const cartHandler = () => {
    setShowcart(prev => !prev)
  }
  const ctx = useContext(Shoectx)

  useEffect(() => {
    fetch(`${ctx.crudurl}/products`)
      .then(res => {
        return res.json()
      })
      .then(d => {
        if (d.length > 0) {
          for (let i = 0; i < d.length; i++) {
            ctx.addproduct(d[i])
          }
        }
      })
      .catch(err => {
        console.log(err.message)
      })


  }, [])

  useEffect(() => {
    fetch(`${ctx.crudurl}/carts`)
      .then(res => {
        return res.json()
      })
      .then(d => {
        let amount = 0
        if (d.length > 0) {
          for (let i = 0; i < d.length; i++) {
            ctx.addtocart(d[i])
            let qty = d[i].sizes + d[i].sizem + d[i].sizel
            amount += qty * d[i].price
          }
          ctx.totalamountHandler(amount)
        }
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [])

  return (
    <>
      <Form />
      <hr />
      <Inventory />
      <CartBtn cartHandler={cartHandler} />
      {showCart && <Cart cartHandler={cartHandler} />}
    </>
  )
}

export default App
