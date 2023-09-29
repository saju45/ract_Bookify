import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../../context/firebaseContext';

const List = () => {

    const [name,setName]=useState('')
    const [isbnNumber,setIsbnNumber]=useState('')
    const [price,setPrice]=useState('')
    const [coverPic,setCoverPic]=useState('')


    const {handleCreateNewListing}=useFirebase()

    const handleSubmit= async(event)=>{
        event.preventDefault()
        await handleCreateNewListing(name,isbnNumber,price,coverPic);
    }

  return (
    <div className="container mt-5">
    <Form onSubmit={handleSubmit}>
<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Enter Book Name</Form.Label>
  <Form.Control type="text" placeholder="Book Name" onChange={(e)=>setName(e.target.value)} />
 
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>ISBN</Form.Label>
  <Form.Control type="text" placeholder="ISBN Number" onChange={(e)=>setIsbnNumber(e.target.value)}/>
</Form.Group>


<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Price</Form.Label>
  <Form.Control type="text" placeholder="Price" onChange={(e)=>setPrice(e.target.value)}/>
</Form.Group>


<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>CoVer Photo</Form.Label>
  <Form.Control type="file"  onChange={(e)=>setCoverPic(e.target.files[0])}/>
</Form.Group>

<Button variant="primary" type="submit">
  Create Book
</Button>
</Form>
</div>  )
}

export default List