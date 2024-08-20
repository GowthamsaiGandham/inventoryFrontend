import { Link } from "react-router-dom";

import "./index.css"



interface productSubDetails{
    imageUrl:string,
    name:string,
    productId:number
}

const Product = (props:productSubDetails)=>{
const {imageUrl,name,productId} = props;
const path = `/stock/${productId}`
return(
<Link className = "link-element" to={path}>
    <li className="product-card-bg-container">
        <img className="product-card-image" src={imageUrl}/>
        <h1 className = "product-card-heading">{name}</h1>
    </li>
</Link>
)
}

export default Product;