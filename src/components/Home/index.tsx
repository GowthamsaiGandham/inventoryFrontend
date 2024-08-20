import {Link,Navigate} from "react-router-dom"

import Cookies from "js-cookie";

import Header from "../Header";


import "./index.css"

const Home = ()=>{

const jwtToken = Cookies.get("jwtToken");
if(jwtToken === undefined){
    return <Navigate to="/login" replace />;
}

return(<div className = "home-bg-container">
    <Header/>
    <div className = "home-details-container">
        <Link to="/stock" className = "home-nav-element">
            <div className = "home-stock-container home-cards-commaon-styling">
                <h1>Stock</h1>
            </div>
        </Link>
        <Link to="/orderDetails" className = "home-nav-element">
            <div className = "home-orders-container home-cards-commaon-styling">
                <h1>Orders</h1>
            </div>
        </Link>
        <Link to="/suppliers" className = "home-nav-element">
            <div className = "home-suppliers-container home-cards-commaon-styling">
                <h1>Suppliers</h1>
            </div>
        </Link>
        <Link to="reports" className = "home-nav-element">
            <div className = "home-reports-container home-cards-commaon-styling">
                <h1>Reports</h1>
            </div>
        </Link>
    </div>
</div>)
}
export default Home;