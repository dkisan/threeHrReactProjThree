import { useContext, useRef } from "react";
import Shoectx from "../store/shoectx";

const Form = () => {
    const nameRef = useRef()
    const descRef = useRef()
    const priceRef = useRef()
    const sizelRef = useRef(0)
    const sizemRef = useRef(0)
    const sizesRef = useRef(0)

    const ctx = useContext(Shoectx)

    const formHandler = (event) => {
        event.preventDefault()

        const item = {
            shoename: nameRef.current.value,
            description: descRef.current.value,
            price: +priceRef.current.value,
            sizel: +sizelRef.current.value,
            sizem: +sizemRef.current.value,
            sizes: +sizesRef.current.value,
        }
        ctx.addproduct(item)
    }

    return (
        <form onClick={(event)=>event.stopPropagation()} className="d-flex justify-content-center align-items-end gap-1 text-center p-2 w-75 m-auto" onSubmit={formHandler}>
            <div className="d-flex flex-column gap-1">
                <label htmlFor="" className="form-label">Shoe Name</label>
                <input ref={nameRef} type="text" className="form-control" name="" id="" />
            </div>

            <div className="d-flex flex-column gap-1">
                <label htmlFor="" className="form-label">Description</label>
                <input ref={descRef} type="text" className="form-control" name="" id="" />
            </div>

            <div className="d-flex flex-column gap-1">
                <label htmlFor="" className="form-label">Price</label>
                <input ref={priceRef} type="number" className="form-control" name="" id="" />
            </div>

            <div className="d-flex flex-column gap-1">
                <label htmlFor="" className="form-label">Quantity Available</label>
                <div className="d-flex">
                    <div className="d-flex flex-column gap-1">
                        <label htmlFor="" className="form-label">L</label>
                        <input ref={sizelRef} type="number" className="form-control" name="" id="" />
                    </div>
                    <div className="d-flex flex-column gap-1">
                        <label htmlFor="" className="form-label">M</label>
                        <input ref={sizemRef} type="number" className="form-control" name="" id="" />
                    </div>
                    <div className="d-flex flex-column gap-1">
                        <label htmlFor="" className="form-label">S</label>
                        <input ref={sizesRef} type="number" className="form-control" name="" id="" />
                    </div>
                </div>
            </div>

            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    )
}

export default Form;