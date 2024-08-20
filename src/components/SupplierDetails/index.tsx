import Cookies from "js-cookie"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {SpinnerRoundOutlined} from "spinners-react";

import "./index.css"
import Product from "../ProductCard";


interface Product {
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
    description: string;
}

interface Supplier {
    supplierId: number;
    supplierName: string;
    mobileNum: string;
    address: string;
    active: boolean;
    imageUrl:string;
    productsList: Product[];
}

const SupplierDetails = ()=>{
    const [supplier,setSupplier] = useState<Supplier>({} as Supplier)

    const {supplierId} = useParams<string>();

    const [isLoading,setLoading] = useState<boolean>(true);

    const getSupplier = async()=>{
        const jwtToken = `Bearer ${Cookies.get("jwtToken")}`;
        const options = {
            method:"GET",
            headers:{
                Authorization:jwtToken
            }
        }
        const url = `http://localhost:8080/suppliers/${supplierId}`;
       
       const response = await fetch(url,options);
       const jsonData = await response.json();
       setSupplier(jsonData);
       setLoading(false);
       
    }

    useEffect(()=>{
        getSupplier()
    })

    return(
        <div className = "supplier-detail-bg-container">
           {isLoading?<div className = "spinner-container">
       <SpinnerRoundOutlined size={170} thickness={128} speed={136} color="white" />
       </div>:( <>
            <div className = "supplier-detail-card-container">
                  <img src={supplier.imageUrl} className  = "supplier-image"/>
                  <p className = "supplier-name">Name : {supplier.supplierName}</p>
                  <div className = "address-contact-container">
                    <p className="supplier-address">{supplier.address}</p>
                    <p className = "supplier-mobile">{supplier.mobileNum}</p>
                  </div>
            </div>
            <div className="supplier-detail-products-container">
                   {
                    supplier.productsList.map(each=><Product key={each.productId} productId={each.productId} imageUrl={each.imageUrl} name = {each.productName}/>)
                   }
            </div>
            </>)}
        </div>
    )
}

export default SupplierDetails;