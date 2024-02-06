import { useState } from 'react'
import './App.css'
import Cart from './component/Cart'
import CartBtn from './component/CartBtn'
import Form from './component/Form'
import Inventory from './component/Inventory'

function App() {

  const [showCart, setShowcart] = useState(false)

  const cartHandler = () => {
    setShowcart(prev => !prev)
  }

  return (
    <>
      <Form />
      <Inventory />
      <CartBtn cartHandler={cartHandler} />
      {showCart && <Cart cartHandler={cartHandler} />}
    </>
  )
}

export default App
