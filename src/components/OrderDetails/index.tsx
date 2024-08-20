
import {useState,useEffect} from "react"

import { useNavigate } from "react-router-dom";





import Cookies from "js-cookie"

import "./index.css"
import Header from "../Header";

interface User {
    userId: number;
    userName: string;
    email: string;
    imageUrl: string;
    deliveryAddress: string;
}

interface UserProduct {
    userProductId: number;
    name: string;
    brand: string;
    price: number;
    quantity: number;
    totalAmount: number; 
    productId: number;
}

interface Order {
    orderId: number;
    user: User;
    orderedDate: string; 
    totalAmount: number;
    paymentStatus: string;
    deliveryDate: string;
    userProducts: UserProduct[];
}

function getDeliveryStatus(currentDate:Date,deliveredDate:string) {
    const deliveryDate: Date = new Date(deliveredDate);

    const differenceInMilliseconds: number = deliveryDate.getTime()-currentDate.getTime();
  
    if (differenceInMilliseconds <= 0) {
      return "Delivered"
    }
  
    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);

  
    return `${days} days, ${hours} hrs, and ${minutes} mins ${seconds} secs left`;
  }

const getFormattedDate = (dateString: string): string => {

    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
  };

const OrderDetails = ()=>{
 const navigate = useNavigate();


 const [ordersList,setOrdersList] = useState<Order[]>([]);

 let count = 0;

 const jwtToken = `Bearer ${Cookies.get("jwtToken")}`;


const onClickingDetailView = (orderId:number)=>{
    navigate(`/orderDetails/${orderId}`);
}


 const getOrders = async ()=>{
       const options = {
            method:"GET",
            headers:{
                Authorization:jwtToken
            }
        }
       const response = await fetch("http://localhost:8080/orders",options);
       const jsonData = await response.json();
       setOrdersList(jsonData);
 }


 const getCountValue = ()=>{
    count = count + 1;
    return count;
 }

 const updatingPaymentStatus = async (orderId:number)=>{
    const jwtToken = `Bearer ${Cookies.get("jwtToken")}`;
    const updateDetails = {
      "paymentStatus":"Completed"
    }
    const options = {
      method:"PUT",
      headers:{
          Authorization:jwtToken,
          "Content-Type": "application/json"
      },
      body:JSON.stringify(updateDetails)
    }
    const url = `http://localhost:8080/orders/${orderId}`;
    await fetch(url,options);
 }

 const getPaymentStatus = (paymentStatus:string,deliveryDate:string,orderId:number)=>{
    if( paymentStatus == "Completed" || getDeliveryStatus(new Date(),deliveryDate) === "Delivered" ){
      updatingPaymentStatus(orderId);
      return "Completed";
    }
    return "Pending";
}


 useEffect(()=>{
      getOrders();
 },[])

 return(
   <div className = 'order-details-bg-container'>
    <Header/>
    <div>
         <h1 className = "orders-heading">Order Details</h1>
         <table className = "table-container">
                <thead>
                    <tr>
                        <th></th>
                        <th>Ordered Date</th>
                        <th>Delivery Address</th>
                        <th>Total Amount</th>
                        <th>Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersList.map((each:Order) => (
                        <tr key={each.orderId}  onClick={() => onClickingDetailView(each.orderId)}>
                            <td>{getCountValue()}</td>
                            <td>{getFormattedDate(each.orderedDate)}</td>
                            <td>{each.user.deliveryAddress}</td>
                            <td>{each.totalAmount}</td>
                            <td>{getPaymentStatus(each.paymentStatus,each.deliveryDate,each.orderId)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
    </div>
 )
}


export default OrderDetails;