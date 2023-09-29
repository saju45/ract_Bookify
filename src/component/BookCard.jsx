/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/firebaseContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
const BookCard = (props) => {

    const [url,setUrl]=useState('')
    const navigate=useNavigate()
    const {getImage}=useFirebase()

    useEffect(()=>{

        getImage(props.imageURL).then(url =>setUrl(url))
    },[])

    console.log(props);
  return (
    <Card style={{ width: '18rem',margin:'5px'} }>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a title {props.name} and this book is sold by {props.displayName} and this book costs tk {props.price}
        </Card.Text>
        <Button variant="primary" onClick={()=> navigate(props.link)}>View</Button>
      </Card.Body>
    </Card> 
    
  )
}

export default BookCard