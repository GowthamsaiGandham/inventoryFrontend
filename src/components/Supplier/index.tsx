import Cookies from 'js-cookie';
import { useEffect,useState } from 'react';

import { useNavigate } from "react-router-dom";

import "./index.css"
import Header from '../Header';
import Loader from '../Loader';

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


const Supplier = ()=>{
    const [suppliersList,setSuppliers] = useState<Supplier[]>([])

    const [isLoading,setLoading] = useState<boolean>(true);

    let count = 0;

    const navigate = useNavigate();

    const getCountValue = ()=>{
        count = count + 1;
        return count;
     }

     const onClickingDetailView = (supplierId:number,active:boolean)=>{
        if(active === true){
            navigate(`/suppliers/${supplierId}`);
        }
        else{
            navigate("/deliveryingNoProducts");
        }
    }

    const jwtToken = `Bearer ${Cookies.get("jwtToken")}`;

    const getSuppliers = async ()=>{
        const options = {
             method:"GET",
             headers:{
                 Authorization:jwtToken
             }
         }
        const response = await fetch("http://localhost:8080/suppliers",options);
        const jsonData = await response.json();
        setSuppliers(jsonData);
        setLoading(false);
  }

   useEffect(()=>{
        getSuppliers();
   },[])
 

    return(
        <div className = "suppliers-bg-container">
                <Header/>
                {isLoading?
         <Loader/>:<div className="supplier-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Supplier Name</th>
                                <th>Address</th>
                                <th>Mobile</th>
                                <th>Supply</th>
                            </tr>
                        </thead>
                        <tbody>
                    {suppliersList.map((each:Supplier) => {
                        let isActive:string;
                        let value:string;
                        if(each.active === true){
                            isActive = "active-supplier";
                            value = "Active";
                        }
                        else{
                            isActive = "inactive-supplier";
                            value = "Inactive"
                        }
                        return(
                            <tr key={each.supplierId} onClick={()=>onClickingDetailView(each.supplierId,each.active)}>
                                <td>{getCountValue()}</td>
                                <td>{each.supplierName}</td>
                                <td>{each.address}</td>
                                <td>{each.mobileNum}</td>
                                <td className = {isActive}>{value}</td>
                            </tr>
                        )})}
                        </tbody>
                    </table>
                </div>}
        </div>
    )
}

export default Supplier;