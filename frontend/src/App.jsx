import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/auth/login';
import Signup from './pages/auth/sigup';
import ForgotPassword from './pages/auth/forgotPassword';
import ResetPassword from './pages/auth/resetPassword';
import Home from './pages/user/home';

import io from 'socket.io-client'

const socket=io.connect(`${import.meta.env.VITE_SERVER_URL}`)

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/forgotpassword' element={<ForgotPassword/>} />
          <Route path='/resetpassword' element={<ResetPassword/>} />
          <Route path='/home' element={<Home socket={socket}/>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
