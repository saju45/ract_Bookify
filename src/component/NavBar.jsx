
import { Container } from "react-bootstrap"
import { Nav } from "react-bootstrap"
import { Navbar } from "react-bootstrap"
import { useFirebase } from "../context/firebaseContext"
const MyNavBar = () => {

  const {logOut} =useFirebase()
  return (
    <>

       <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/list">Add Listing</Nav.Link>
            <Nav.Link href="/book/orders">Orders</Nav.Link>
            <button href="/login" onClick={logOut}>Logout</button>

          </Nav>
        </Container>
      </Navbar>
      <br />
     

    </>
  )
}

export default MyNavBar
