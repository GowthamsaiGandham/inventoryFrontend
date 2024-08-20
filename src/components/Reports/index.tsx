import {useState,useEffect} from "react"
import Product from "../ProductCard";
import Cookies  from "js-cookie";



import "./index.css"
import Header from "../Header";
import Loader from "../Loader";

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


interface Supplier {
    supplierId: number;
    supplierName: string;
    mobileNum: string;
    address: string;
    active: boolean;
    imageUrl:string;
    productsList: ProductType[];
}



const Reports = ()=>{
    const [productsList,setProductsList] =  useState<ProductType[]>([]);

    const [isLoading1,setLoading1] = useState<boolean>(true);

   
    const [inActiveSuppliers,setInactiveSuppliers] = useState<Supplier[]>([]);

    const [isLoading2,setLoading2] = useState<boolean>(true);

    let count = 0;

    const getProductsList = async ()=>{
                const jwtToken = `Bearer ${Cookies.get("jwtToken")}`;

                const options = {
                headers:{
                    Authorization:jwtToken
                }
                }
                
                const response = await fetch("https://inventorymanagement-wiks.onrender.com/products",options);
                const data: ProductType[] = await response.json();
                setProductsList(data);
                setLoading1(false);
        }
        const getSuppliers = async ()=>{
            const jwtToken = `Bearer ${Cookies.get("jwtToken")}`;
            const options = {
                 method:"GET",
                 headers:{
                     Authorization:jwtToken
                 }
             }
            const response = await fetch("https://inventorymanagement-wiks.onrender.com/suppliers",options);
            const jsonData = await response.json();
            setInactiveSuppliers(jsonData);
            setLoading2(false);
      }
      const getCountValue = ()=>{
        count = count + 1;
        return count;
     }
    
     

        useEffect(()=>{
            getProductsList();
            getSuppliers();
        },[]);

    return(
         <div className = "reports-bg-container">
            <Header/>
            <h1 className="reports-heading">Reports</h1>
            <div>
                {
                    isLoading1?<div className = "spinner-container">
                    <Loader />
                    </div>:(
                        <div className = "reports-heading-products-container">
                              <h1 className = "reports-sub-heading">Products To be Import</h1>
                              <div className = "reports-products-container">
                                {productsList.map(each=>{
                                    if(each.active == false){
                                        return <Product key={each.productId} imageUrl={each.imageUrl} name = {each.productName} productId={each.productId}/>
                                    }
                                })}
                             </div>
                       </div>
                    )
                }
            </div>
            <div className="reports-suppliers-inactive-bg-container">
           
             {isLoading2?<Loader/>:<div className = "inactive-suppliers-and-heading-container">
                <h1 className = "reports-sub-heading">Inactive Suppliers</h1>
                <table className="table-container">
                <thead className = "table-header">
                    <tr>
                        <th className = "table-heading"></th>
                        <th className = "table-heading">Supplier Name</th>
                        <th className = "table-heading">Address</th>
                        <th className = "table-heading">Mobile</th>
                        <th className = "table-heading">Supply</th>
                    </tr>
                </thead>
                <tbody>
            {inActiveSuppliers.map((each:Supplier) => {
                if(each.active === false){
                    return(
                        <tr key={each.supplierId}>
                            <td>{getCountValue()}</td>
                            <td>{each.supplierName}</td>
                            <td>{each.address}</td>
                            <td>{each.mobileNum}</td>
                            <td className = "inactive-supplier">Inactive</td>
                        </tr>
                    )
                }
               })}
                </tbody>
                </table>
              </div>}
            </div>
         </div>
    )
}

export default Reports;