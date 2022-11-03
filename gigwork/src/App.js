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
import PFnone from './pages/PFnone';
import PFmyview from './pages/PFmyview';
import PFotherview from './pages/PFotherview';
import PFlist from './pages/PFlist';
import MPprivacy from './pages/MPprivacy';
import PFcreate from './pages/PFcreate';
import JOcreate from './pages/JOcreate';
import JOdetail from './pages/JOdetail';
import JOlist from './pages/JOlist';


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
        <Route path='/PFnone' element={<PFnone/>}/>
        <Route path='/PFcreate' element={<PFcreate/>}/>
        <Route path='/PFmyview' element={<PFmyview/>}/>
        <Route path='/PFotherview' element={<PFotherview/>}/>
        <Route path='/PFlist' element={<PFlist/>}/>
        <Route path='/MPprivacy' element={<MPprivacy/>}/>
        <Route path='/JOcreate' element={<JOcreate/>}/>
        <Route path='/JOlist' element={<JOlist/>}/>
        <Route path='/JOdetail' element={<JOdetail/>}/>
        <Route path='/Register' element={<Register/>}/>

      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
