import { useContext } from "react";
import Shoectx from "../store/shoectx";

const CartBtn = (props)=>{
    const ctx = useContext(Shoectx)

    return (
        <div className="position-absolute top-0 end-0 p-3">
            <button onClick={props.cartHandler} className="btn btn-info">Cart <span className="font-bold fs-5">{ctx.noofitem}</span></button>
        </div>
    )
}

export default CartBtn;