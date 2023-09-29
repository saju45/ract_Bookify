import { useParams } from "react-router"
import { useFirebase } from "../../context/firebaseContext";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const Details = () => {
    const params=useParams()

    const [data,setData]=useState(null)
    const [url,setUrl]=useState('')
    const [qty,setQty]=useState(1)

    const {getBookById,getImage,placeOrder}=useFirebase()
    
    // console.log(params.bookid);

    useEffect(()=>{
     getBookById(params.bookid).then(value =>setData(value.data()))

    },[])

    useEffect(()=>{
      if(data){
        const imageUrl=data.imageURL
        getImage(imageUrl).then(url => setUrl(url))

      }
    },[data])

    const BookPlaceOrder=async()=>{
      placeOrder(params.bookid,qty)
      
    }

    if(data==null) return <h2>Loading....</h2>
  return (
    <div className="container">
      <h1>{data.name}</h1>
      <img src={url} width="50%"  alt={data.name}  style={{borderRadius:"10px"}}/>
      <h1>Details</h1>
      <p>Price : {data.price} Taka</p>
      <p>ISBN Number : {data.isbn}</p>
      <h1>Owen Details</h1>
      <p>
      <img src={data.photoURL} width="200px" height="100px" style={{borderRadius:"10px"}} alt="" />

      </p>
      <p>Name : {data.displayName}</p>
      <p>Email : {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicQuentity">
        <Form.Label>Quentity</Form.Label>
        <Form.Control type="number" value={qty} placeholder="quentity" onChange={(e)=>setQty(e.target.value)}/>
      </Form.Group>
      <Button variant="success" onClick={BookPlaceOrder}>Buy Now</Button>
    </div>
  )
}

export default Details