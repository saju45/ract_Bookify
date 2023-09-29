import { useEffect, useState } from "react"
import { useFirebase } from "../../context/firebaseContext"
import BookCard from "../BookCard"
import { CardGroup } from "react-bootstrap"

const Home = () => {

  const [books,setBooks]=useState([])
  const {getListAllBooks} =useFirebase()

  useEffect(()=>{

    getListAllBooks().then(books => setBooks(books.docs))
    console.log(books);
  },[])
  return (
    <div className="container mt-5">
      <CardGroup>
      {books.map((book,index)=> <BookCard link={`book/view/${book.id}`} key={index} id={book.id} {...book.data()}/>)}

      </CardGroup>
    </div>
  )
}

export default Home