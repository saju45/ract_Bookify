/* eslint-disable react/prop-types */
import {getFirestore,collection,addDoc,getDocs, doc, getDoc,query,where} from 'firebase/firestore'
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import  { createContext, useContext,useState,useEffect } from "react";
import {initializeApp} from 'firebase/app'
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup,onAuthStateChanged, signOut} from 'firebase/auth'

const firebaseContext=createContext(null)

const firebaseConfig = {
    apiKey: "AIzaSyCG-nAKDKPs-csQ1DUk06ZRoa41s2K1aH4",
    authDomain: "bookify-b55ca.firebaseapp.com",
    projectId: "bookify-b55ca",
    storageBucket: "bookify-b55ca.appspot.com",
    messagingSenderId: "1036479094086",
    appId: "1:1036479094086:web:93fc5ee1de2b1b66c85947"
  };

  const firebaseApp=initializeApp(firebaseConfig)
  export const firebaseAuth=getAuth(firebaseApp)
  const googleProvider=new GoogleAuthProvider()
  const firestore=getFirestore(firebaseApp)
  const storage=getStorage(firebaseApp)


export const useFirebase=()=>{

    return useContext(firebaseContext)
}

export const FirebaseProvider=(props)=>{

    const [user,setUser]=useState(null)

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,user=>{
             if(user)setUser(user);
             else setUser(null)
        })

    },[])

    const RegisterUser=async(email,password)=>{

        try {
            await createUserWithEmailAndPassword(firebaseAuth,email,password)
        } catch (err) {
            console.error(err);
        }

    }

    const loginUser=async(email,password)=>{
        
        try {
            await signInWithEmailAndPassword(firebaseAuth,email,password)
        } catch (error) {
            console.error(error);
        }
    }

    const loginWithGoogle=async()=>{
        
        try {
            await signInWithPopup(firebaseAuth,googleProvider)
        } catch (error) {
            console.error(error);
        }
    }

    const logOut=async()=>{
        try {
            await signOut(firebaseAuth)
        } catch (error) {
            console.log(error);
        }
    }

    const isLoggedIn=user?true:false;




    const handleCreateNewListing= async(name,isbn,price,coverPic)=>{

        const imageRef=ref(storage,`uploads/images/${Date.now()}-${coverPic.name}`)
        const uploadImage= await uploadBytes(imageRef,coverPic)

         return await addDoc(collection(firestore,"books"),{
            name,
            isbn,
            price,
            imageURL:uploadImage.ref.fullPath,
            userId:user.uid,
            userEmail:user.email,
            displayName:user.displayName,
            photoURL:user.photoURL
        }) 
    }

    const getListAllBooks=async()=>{
        return getDocs(collection(firestore,"books"),)
    }

    const getBookById=async(id)=>{
        const docRef= doc(firestore,"books",id)
        const result= await getDoc(docRef)
        return result
    }


    const getImage=(path)=>{
       return getDownloadURL(ref(storage,path))
    }

    const placeOrder=async(bookId,qty)=>{

        const collectionRef= collection(firestore,"books",bookId, 'orders')
        const result =await addDoc(collectionRef,{
            userId:user.uid,
            userEmail:user.email,
            displayName:user.displayName,
            photoURL:user.photoURL,
            qty :Number(qty)
            });

        return result;
    }

    const fetchMyBooks=async(userId)=>{

        const collectionRef=collection(firestore,"books")
        const q=  query(collectionRef,where('userId','==',userId))
        const result = await getDocs(q)
        console.log(result);
        return result;
    }


    const getOrders=async(bookId)=>{

        const collectionRef=collection(firestore,"books",bookId,'orders')
        const result =await getDocs(collectionRef)
        return result;
    }

    const value={
        RegisterUser,
        loginUser,
        loginWithGoogle,
        isLoggedIn,
        handleCreateNewListing,
        getListAllBooks,
        getImage,
        getBookById,
        placeOrder,
        fetchMyBooks,
        logOut,
        user,
        getOrders
    }

    

    return(
        <firebaseContext.Provider value={value}>
            {props.children}

        </firebaseContext.Provider>
    )

}