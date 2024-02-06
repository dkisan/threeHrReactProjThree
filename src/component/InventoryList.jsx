import { useContext } from "react";
import Shoectx from "../store/shoectx";

const InventoryList = (props) => {
    const ctx = useContext(Shoectx)

    const addtocarthandler = (event) => {
        let s =event.target.innerText.split(' ')
        const item = {
            id: props.p.id,
            size: s[1]
        }
        ctx.addtocart(item)
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