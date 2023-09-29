
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import { Route, Routes } from 'react-router';
import Home from './component/pages/Home';
import Register from './component/pages/Register';
import Login from './component/pages/Login';
import MyNavBar from './component/NavBar';
import List from './component/pages/List';
import Details from './component/pages/Details';
import ViewOrders from './component/pages/ViewOrders';
import ViewOrderDetails from './component/pages/ViewOrderDetails';

function App() {

  return (

    <>
    <MyNavBar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/book/list' element={<List/>}/>
      <Route path='/book/view/:bookid' element={<Details/>}/>
      <Route path='/book/orders' element={<ViewOrders/>}/>
      <Route path='/book/orders/:bookId' element={<ViewOrderDetails/>}/>

    </Routes>
    </>

  )
}

export default App
