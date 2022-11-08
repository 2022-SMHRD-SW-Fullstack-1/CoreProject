import './css/App.css';
import { Routes, Route, useLocation } from 'react-router-dom'

import Header_logout from './components/Header_logout'
import Header_login from './components/Header_login.js'
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
import EVLmanner from './pages/EVLmanner';
import MyBookmark from './pages/MyBookmark';
import MyPost from './pages/MyPost';


function App() {
  
    //socket 연결
    const [socket, setSocket] = useState();
  
    function connect(userName) {
      let ws = new WebSocket("ws://localhost:8086/gigwork/replyEcho/"+userName)
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

  const [header, setHeader] = useState(<Header_logout/>)
  const url = useLocation()

  useEffect(() => {
    localStorage.getItem("nick") !== null
    && setHeader(<Header_login socket={socket}/>)
  }, [url])

  //창 크기에 따른 헤더 변환
  // const handleResize = () => {
  //   window.innerWidth > 900
  //     ? setHeader(<Header socket={socket}/>)
  //     : setHeader(<Header_s />)
  // }

  //창 크기가 변화하는지 지속적으로 체크함
  // useEffect(() => {
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   }
  // }, []);

  //url이 변경되면 헤더 크기를 창크기에 맞게 설정해줌
  // useEffect(() => {
  //   window.innerWidth > 900
  //     ? setHeader(<Header socket={socket}/>)
  //     : setHeader(<Header_s />)
  // }, [url])

  return (
    <div>

      {localStorage.getItem("nick") === null?<Header_logout/>:<Header_login socket={socket}/>}

      <div style={{ height: '60px' }} />
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/login' element={<Login connect={connect} socket={socket} setHeader={setHeader}/>} />
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
        <Route path='/EVLmanner' element={<EVLmanner />} />
        <Route path='/MyPost' element={<MyPost />} />
        <Route path='/MyBookmark' element={<MyBookmark />} />
        
  
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
