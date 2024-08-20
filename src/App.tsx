import { BrowserRouter,Route, Routes } from "react-router-dom"


import Stock from "./components/Stock"

import ProductDetails from "./components/ProductDetails"

import OrderDetail from "./components/OrderDetail";

import Login from "./components/Login"


import OrderDetails from "./components/OrderDetails"


import Home from "./components/Home";

import Supplier from "./components/Supplier"
import SupplierDetails from "./components/SupplierDetails";

import Reports from "./components/Reports";
import DeliveringNoProducts from "./components/DeliveringNoProducts";
import NotFound from "./components/NotFound";
// import AddOrUpdateDetails from "./components/AddOrUpdateProducts";



const App = ()=><BrowserRouter>
                     <Routes>
                        <Route path="/" element = {<Home/>}/>
                        <Route path = "/login" element = {<Login/>}/>
                        <Route   path = "/stock" element  = {<Stock/>}/>
                        <Route    path = "/stock/:productId" element = {<ProductDetails/>}/>
                        <Route path = "/orderDetails" element = {<OrderDetails/>}/>
                        <Route path = "/orderDetails/:orderId" element = {<OrderDetail/>}/>
                        <Route path= "/suppliers" element = {<Supplier/>}/>
                        <Route path = "/suppliers/:supplierId" element = {<SupplierDetails/>}/>
                        <Route path="/reports" element = {<Reports/>}/>
                        <Route path="deliveryingNoProducts" element = {<DeliveringNoProducts/>}/>
                        {/* <Route path="addOrUpdateProducts" element = {<AddOrUpdateDetails/>}/> */}
                        <Route  path="*" element = {<NotFound/>}/>
                     </Routes>
                </BrowserRouter>


export default App
