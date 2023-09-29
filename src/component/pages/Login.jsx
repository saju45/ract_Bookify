import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { firebaseAuth, useFirebase } from '../../context/firebaseContext';
import { useNavigate } from 'react-router';

const Login = () => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {loginUser,loginWithGoogle,isLoggedIn}=useFirebase()

    const nagivate=useNavigate()

    const  handleSubmit=(event)=>{
        event.preventDefault()
        loginUser(email,password);
        console.log("Login Success");
      
    }

    console.log(firebaseAuth?.currentUser?.email);
    console.log(isLoggedIn);

    useEffect(()=>{
      if(isLoggedIn){
        nagivate("/")
      }
    },[isLoggedIn,nagivate])

  return (
    <div className="container mt-5">
          <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
   
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    <h1 className='mt-5 mb-5'>OR</h1>
    <Button variant='danger' onClick={()=>loginWithGoogle()}>Signin with google</Button>
    </div>

  )
}

export default Login