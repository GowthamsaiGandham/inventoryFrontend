import Product from "../ProductCard";

import { useEffect, useState } from "react";

import { SpinnerRoundOutlined } from 'spinners-react';

import Cookies from "js-cookie";

import "./index.css"
import Header from "../Header";





interface ProductType {
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

const Stock = ()=>{
   const [productsList,setProductsList] = useState<ProductType[]>([]);

   const [isLoading,setLoading] = useState<boolean>(true);

   const getProductsList = async ()=>{
         const jwtToken = `Bearer ${Cookies.get("jwtToken")}`;

         const options = {
            headers:{
                Authorization:jwtToken
            }
         }
         
         const response = await fetch("http://localhost:8080/products",options);
         const data: ProductType[] = await response.json();
         setProductsList(data);
         setLoading(false);
   }

   useEffect(()=>{
       getProductsList();
   },[]);

   return(
    <div className = "stock-bg-container">
       <Header/>
       {isLoading ?<div className = "spinner-container">
       <SpinnerRoundOutlined size={170} thickness={128} speed={136} color="white" />
       </div>:
       <>
       <div className = "products-heading-and-add-btn-container">
        <h1 className = "products-heading">Products</h1>
        <div className = "products-add-btn-container">
            <button type = "button" className = "products-add-btn">Add</button>
        </div>
       </div>
       <ul className="product-cards-bg-container">
        {
            productsList.map(each=>{
                if(each.active === true){
                    return <Product productId = {each.productId} key={each.productId}  imageUrl={each.imageUrl} name = {each.productName}/>
                }
            })
        }
       </ul>
       </>}
    </div>
   )

}


export default Stock;