import {useEffect, useState} from "react";

import { useParams } from "react-router-dom";

import UserProductCard from "../UserProductCard";

import {SpinnerRoundOutlined} from "spinners-react";



import "./index.css"

import Cookies from "js-cookie";

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
    imageUrl:string
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

const OrderDetail = ()=>{
    const [orderDetail,setOrderDetail] = useState<Order>({} as Order);

    const [isLoading,setLoading] = useState<boolean>(true);

    const [currentDate,setCurrentDate] = useState<Date>(new Date())

    const {orderId} = useParams<string>();

    const updatingPaymentStatus = async ()=>{
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
    

    const getPaymentStatus = ()=>{
              if(orderDetail.paymentStatus === "Completed" || getDeliveryStatus(currentDate,orderDetail.deliveryDate) === "Delivered" ){
                updatingPaymentStatus()
                return "Completed";
              }
              return "Pending";
    }

  
    const updateTime = ()=>{
        
        setInterval(()=>{
            setCurrentDate(new Date());
        },1000);
    }
    

    const getOrderDetail = async ()=>{
          const jwtToken = `Bearer ${Cookies.get("jwtToken")}`;
           


          const options = {
            method:"GET",
            headers:{
                Authorization:jwtToken
            }
          }

          const url =`http://localhost:8080/orders/${orderId}`;

          const response = await fetch(url,options);
          const jsonData = await response.json();
          
          setOrderDetail(jsonData);
          setLoading(false);
    }

    useEffect(()=>{ 
        updateTime();
        getOrderDetail();
    },[])



    return(
      <div className = "order-detail-bg-conatiner">
        {isLoading?<div className = "spinner-container">
       <SpinnerRoundOutlined size={170} thickness={128} speed={136} color="white" />
       </div>:<div>
        <div className = "order-detail-top-part-container">
            <div className = "user-details-container">
                <img className = "user-image" src={orderDetail.user.imageUrl}/>
                <p className="user-name">{orderDetail.user.userName}</p>
            </div>
            <div className = "time-payment-address-container">
                <h1 className = "order-details-sub-heading">Order Details</h1>
                <p className = "delivery-status">Delivery Status : {getDeliveryStatus(currentDate,orderDetail.deliveryDate)}</p>
                <p className = "payment-status">Total Amount : {orderDetail.totalAmount}</p>
                <p className = "payment-status">Payment Status : {getPaymentStatus()}</p>
                <p className="user-address">Address : {orderDetail.user.deliveryAddress}</p>
            </div>
        </div>
        <div className = "order-detail-bottom-part-container">
            {
                orderDetail.userProducts.map(each=><UserProductCard key={each.userProductId} imageUrl = {each.imageUrl} productName = {each.name} quantity = {each.quantity}/>)
            }
        </div>
        </div>}
    </div>
    )
}


export default OrderDetail;