import './css/App.css';
import { Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/Header'
import Header_s from './components/Header_s';
import Chat from './pages/Chat'
import Footer from './components/Footer'
import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'
import { useEffect, useState } from 'react';


function App() {

  const [header, setHeader] = useState()
  const url = useLocation()
  
    const handleResize = () => {
      window.innerWidth>900
      ?setHeader(<Header/>)
      :setHeader(<Header_s/>)
    }

    useEffect(()=>{
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }, []);

    useEffect(()=>{
      window.innerWidth>900
      ?setHeader(<Header/>)
      :setHeader(<Header_s/>)
    },[url])
  

  return (
    <div>

      {header}
      
      <div style={{height: '60px'}}/>
      <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
