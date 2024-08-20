import Header from "../Header";

import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

import {useState} from "react";

import "./index.css"

const AddOrUpdateDetails = ()=>{
    const [productName,setProductName] = useState("");

    const [brand,setBrand] = useState("");

    const navigate = useNavigate();

    const [price,setPrice] = useState("");

    const [quantity,setQuantity] = useState("");

    const [reorderLevel,setReorderLevel] = useState("");

    const [image,setImage] = useState("");

    const [description,setDescription] = useState("");

    const [supplierId,setSupplier] = useState("");

    const onChangingProductName = (event:React.ChangeEvent<HTMLInputElement>)=>{
          setProductName(event.target.value);
    }

    const onChangingBrand  = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setBrand(event.target.value);
    }

    const onChangingPrice= (event:React.ChangeEvent<HTMLInputElement>)=>{
        setPrice(event.target.value);
    }

    const onChangeQuantity = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setQuantity(event.target.value);
    }

    const onChangingReorderLevel = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setReorderLevel(event.target.value);
    }

    const onChangeImage = (event:React.ChangeEvent<HTMLInputElement>)=>{
         setImage(event.target.value);
    }

    const onChangeDescription = (event:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setDescription(event.target.value);
    }

    const onChangingSupplier = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setSupplier(event.target.value);
    }

    const addNewProduct = async()=>{
        const productData = {
            productName ,
            brand,
            price:parseFloat(price),
            quantity:parseInt(quantity),
            reorderLevel:parseInt(reorderLevel),
            imageUrl:image,
            description,
            supplierId:parseInt(supplierId)
        }

        const jwtToken  = `Bearer ${Cookies.get("jwtToken")}`;

        const options = {
            method:"POST",
            headers:{
                Authorization:jwtToken,
                "Content-Type": "application/json"
            },
            body:JSON.stringify(productData)
        }

        await fetch("http://localhost:8080/products",options);

        navigate("/stock");
    }

    const onSubmittingProductDetails = (event:React.FormEvent<HTMLFormElement>)=>{
          event.preventDefault();
          addNewProduct();
    }

    return(<div className = "add-or-update-products-bg-container">
        <Header/>
        <form onSubmit={onSubmittingProductDetails} className = "add-product-form-container">
          <div className = "name-brand-parts-container">
            <div className = "add-or-update-products-name-and-input-element-container">
                <label htmlFor="product-name" className = "add-or-update-products-name label-el">Name</label>
                <input  id="product-name" className = "add-or-update-products-name-input-element" value={productName} onChange = {onChangingProductName} type = "text"/>
            </div>
            <div className = "add-or-update-products-name-and-input-element-container">
                <label htmlFor="brand-name"  className = "add-or-update-products-name label-el">Brand</label>
                <input  value = {brand} id="brand-name" className = "add-or-update-products-name-input-element" onChange={onChangingBrand} type = "text"/>
            </div>
          </div>
          <div className = "name-brand-parts-container">
            <div className = "add-or-update-products-name-and-input-element-container">
                <label htmlFor="product-price" className = "add-or-update-products-name label-el">Price</label>
                <input value={price}  id="product-price" className = "add-or-update-products-name-input-element" onChange = {onChangingPrice} type = "text"/>
            </div>
         </div>
         <div className = "name-brand-parts-container">
            <div className = "add-or-update-products-name-and-input-element-container">
                <label htmlFor="product-quantity" className = "add-or-update-products-name label-el">Quantity</label>
                <input value = {quantity}  id="product-quantity" className = "add-or-update-products-quantity-input-element" onChange = {onChangeQuantity}   type = "text"/>
            </div>
            <div className = "add-or-update-products-name-and-input-element-container"> 
                <label htmlFor="product-reorder-level" className = "add-or-update-products-name label-el reorderlabel-element">Reorder Level</label>
                <input value={reorderLevel} id="product-reorder-level" className = "add-or-update-products-quantity-input-element" onChange={onChangingReorderLevel} type = "text"/>
            </div>
         </div>
         <div className="name-brand-parts-container">
            <div className = "add-or-update-products-name-and-input-element-container">
                <label htmlFor="product-image" className = "add-or-update-products-name label-el">Image</label>
                <input value = {image} id="product-image"  className = "add-or-update-products-name-input-element" onChange={onChangeImage} type = "text"/>
            </div>
            <div className = "add-or-update-products-name-and-input-element-container">
                <label htmlFor="supplier-id" className = "add-or-update-products-name label-el">Supplier</label>
                <input value = {supplierId} id="supplier-id"  className = "add-or-update-products-quantity-input-element" onChange={onChangingSupplier} type = "text"/>
            </div>
         </div>
         <div className="name-brand-parts-container">
            <div className = "add-or-update-products-description-and-textarea-el-container">
                <label htmlFor="product-description" className = "add-or-update-products-name label-el">Description</label>
                <textarea className="textarea-element" value = {description} id="product-description"  rows={5} cols={30} onChange={onChangeDescription} />
            </div>
         </div>  
            <div className = "add-product-btn-container">
                <button type="submit" className = "add-product-btn">Add Product</button>
            </div>
        </form>
    </div>)
}
        


export default AddOrUpdateDetails;