import "./index.css"

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Cookies from "js-cookie";
import Header from "../Header";

interface ProductType{
    productId: number;
    productName: string;
    brand: string;
    price: number;
    quantity: number;
    totalAmount: number;
    reorderLevel: number;
    active: boolean;
    supplierId: number;
    imageUrl: string;
    description:string;
}



const ProductDetails = ()=>{
   const [productDetails,setProductDetails] = useState<ProductType>({} as ProductType);

   const { productId } = useParams<{ productId: string }>();

    const getProductDetails = async ()=>{
        const jwtToken  = `Bearer ${Cookies.get("jwtToken")}`
        const options = {
            method:"GET",
            headers:{
                Authorization:jwtToken
            }
        }

        const url = `http://localhost:8080/products/${productId}`

        const response = await fetch(url,options);
        const jsonData = await response.json();
        setProductDetails(jsonData);
    }

    useEffect(()=>{
      getProductDetails();
    },[])

    

    return(
<div className="product-details-bg-container">
    <Header/>
    <div className = "product-details-image-sub-details-container">
           <div className="product-details-image-container">
             <img src={productDetails.imageUrl} className="product-details-image"/>
           </div>
            <div className = "product-sub-details-container">
                <p className = "product-subdetails"><span className="product-details-subheading">Name</span> : {productDetails.productName}</p>
                <p  className = "product-subdetails"><span className="product-details-subheading">Brand </span>: {productDetails.brand}</p>
                <p  className = "product-subdetails"><span className="product-details-subheading">Price</span> : {productDetails.price}</p>
                <p  className = "product-subdetails"><span className="product-details-subheading">Quantity</span> : {productDetails.quantity}</p>
                <p  className = "product-subdetails"><span className="product-details-subheading">Reorder Level</span> : {productDetails.reorderLevel}</p>
                <p  className = "product-subdetails"><span className="product-details-subheading">Total Amount</span> : {productDetails.totalAmount}</p>
                <p  className = "product-subdetails"><span className="product-details-subheading">Description</span>: {productDetails.description}</p>
            </div>
    </div>
</div>
    )
}


export default ProductDetails;