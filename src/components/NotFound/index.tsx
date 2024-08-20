import Header from "../Header";
import "./index.css"

const NotFound = ()=>{
     return(
        <div className = "deliverying-no-products-container">
             <Header/>
             <div className = "deliverying-no-products-image-and-caption-container">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV1McZvRXOsoMKSC_5REpN19R9QGj_rDSHrg&s" className = "not-found-image"/>
                <h1 className = "deliverying-no-products-caption">Page not Available</h1>
             </div>
        </div>
     )
}

export default  NotFound;