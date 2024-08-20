import Header from "../Header";
import "./index.css"

const DeliveringNoProducts = ()=>{
     return(
        <div className = "deliverying-no-products-container">
             <Header/>
             <div className = "deliverying-no-products-image-and-caption-container">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSldDXBPWyEPOWxU4CNq1QPIK8O6BkS2H4Ddg&s" className = "deliverying-no-products-image"/>
                <h1 className = "deliverying-no-products-caption">Deliverying No Products</h1>
             </div>
        </div>
     )
}

export default  DeliveringNoProducts;