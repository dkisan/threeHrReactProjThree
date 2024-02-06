import { useContext } from "react";
import Shoectx from "../store/shoectx";
import InventoryList from "./InventoryList";



const Inventory = () => {
    const ctx = useContext(Shoectx)

    return (
        <div className="w-75 m-auto d-flex justify-content-center p-2" onClick={(event)=>event.stopPropagation()}>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th className="text-center" scope="col" colSpan='3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ctx.products.map((p, i) => {
                            return <InventoryList p={p} key={i} />
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Inventory;