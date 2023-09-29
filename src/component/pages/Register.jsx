import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../../context/firebaseContext';
import { useNavigate } from 'react-router';

const Register = () => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const {RegisterUser,isLoggedIn}=useFirebase()

    const navigate=useNavigate()

    const  handleSubmit=(event)=>{
        event.preventDefault()
        RegisterUser(email,password);
        console.log("Register Success");
    }

    useEffect(()=>{
        if(isLoggedIn){
            navigate("/")
        }
      },[isLoggedIn,navigate])

  return (
    <div className="container mt-5">
          <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
   
      <Button variant="primary" type="submit">
        Create Account
      </Button>
    </Form>
    </div>
  )
}

export default Register