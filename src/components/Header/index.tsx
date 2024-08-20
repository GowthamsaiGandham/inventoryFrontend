import { Link,useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css"

const Header = ()=>{

    const navigate = useNavigate();

    const onLoggingOut = ()=>{
        Cookies.remove("jwtToken");
        navigate("/login");
    }
    return(
    <div className = "header-container">
      <img src="https://t4.ftcdn.net/jpg/02/86/20/27/360_F_286202792_yLD4HEmCF2YpIgevD2sNnOQ8PambyfZn.jpg" className = "website-logo"/>
      <div className = "nav-elements-container">
        <Link className = "nav-element" to="/"><p className = "header-item">Home</p></Link>
        <Link className = "nav-element" to="/stock"><p className = "header-item">Products</p></Link>
        <Link className = "nav-element" to="/orderDetails"><p className = "header-item">Orders</p></Link>
        <Link className = "nav-element" to="/suppliers"><p className = "header-item">Suppliers</p></Link>
        <Link className = "nav-element" to="/reports"><p className = "header-item">Reports</p></Link>
        <div className = "logout-btn-container">
            <button type="button" className = "logout-btn"  onClick={onLoggingOut}>Logout</button>
        </div>
      </div>
   </div>
    )
}
   


export default Header;