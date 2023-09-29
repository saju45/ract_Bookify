import { useEffect, useState } from "react"
import {  useFirebase } from "../../context/firebaseContext"
import BookCard from "../BookCard"

const ViewOrders = () => {
    const {fetchMyBooks,isLoggedIn,user}=useFirebase()
    const [books,setBooks]=useState([])
    console.log(user);
    useEffect(()=>{
        if(isLoggedIn)
        fetchMyBooks(user.uid).then(books => setBooks(books.docs))
    },[])

    console.log(books);

    if(!isLoggedIn) return <h2>Please loggedIn fast</h2>

 return (
    <div>
        {books.map((book,index) => <BookCard link={`${book.id}`} key={index} {...book.data()}/>)}
    </div>
  )
}

export default ViewOrders