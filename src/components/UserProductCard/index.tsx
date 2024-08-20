import "./index.css"

interface userProductType{
    imageUrl:string,
    productName:string,
    quantity:number
}

const UserProductCard = (props:userProductType)=>{
  const {imageUrl,productName,quantity} = props;
  return (
    <div className = "user-product-card-container">
                <img className = "user-product-image" src={imageUrl}/>
                <p className="user-product-name">Product Name : {productName}</p>
                <p className="user-product-quantity">Quantity : {quantity}</p>
    </div>
  )
}


export default UserProductCard;