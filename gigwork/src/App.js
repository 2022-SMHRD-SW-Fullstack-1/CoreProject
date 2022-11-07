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
import PFcorrection from './pages/PFcorrection';


function App() {

  const [header, setHeader] = useState()
  const url = useLocation()

  //창 크기에 따른 헤더 변환
  const handleResize = () => {
    window.innerWidth > 900
      ? setHeader(<Header />)
      : setHeader(<Header_s />)
  }

  //창 크기가 변화하는지 지속적으로 체크함
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  //url이 변경되면 헤더 크기를 창크기에 맞게 설정해줌
  useEffect(() => {
    window.innerWidth > 900
      ? setHeader(<Header />)
      : setHeader(<Header_s />)
  }, [url])

  //socket 연결
  const [socket, setSocket] = useState();

  function connect() {
    let ws = new WebSocket("ws://localhost:8086/gigwork/replyEcho")
    setSocket(ws)
    ws.onopen = () => {
      console.log("websocket: connected")
      // ws.send("sending message from client-server")

      ws.onmessage = function (event) {
        console.log(event.data + '\n');
      };
    }
    ws.onclose = function (event) {
      console.log('Info: connection closed.');
      // setTimeout( function(){connect()}, 1000)
    };
    ws.onerror = function (event) { console.log('Info: connection closed.'); };
    setSocket(ws);
  }

  return (
    <div>

      {header}

      <div style={{ height: '60px' }} />
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/chat' element={<Chat socket={socket} connect={connect}/>} />
        <Route path='/PFnone' element={<PFnone />} />
        <Route path='/PFcreate' element={<PFcreate />} />
        <Route path='/PFmyview' element={<PFmyview />} />
        <Route path='/PFotherview' element={<PFotherview />} />
        <Route path='/PFlist' element={<PFlist />} />
        <Route path='/MPprivacy' element={<MPprivacy />} />
        <Route path='/JOcreate' element={<JOcreate />} />
        <Route path='/JOlist' element={<JOlist />} />
        <Route path='/JOdetail' element={<JOdetail />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/PFcorrection' element={<PFcorrection />} />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
