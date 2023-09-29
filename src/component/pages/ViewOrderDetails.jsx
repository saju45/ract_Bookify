import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useFirebase } from "../../context/firebaseContext"

const ViewOrderDetails = () => {
    const params=useParams()
    const [orders,setOrders]=useState([])
    const {bookId}=params

    const {getOrders}=useFirebase()
    useEffect(()=>{
       
        getOrders(bookId).then(value => setOrders(value.docs))
    },[])

  return (
    <div className="container mt-5" style={{border:'1px solid ', padding:'10px'}}>
        <h1>Orders</h1>
        {orders.map((order,index)=> {
            const data=order.data();
            return(
                <div key={index}>
                    <h5>Orderby: {data.displayName}</h5>
                    <h5>Qty : {data.qty}</h5>
                    <h5>Email : {data.userEmail}</h5>
                </div>
            )
        })}
    </div>
  )
}

export default ViewOrderDetails