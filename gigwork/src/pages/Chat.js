import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
// https://stomp-js.github.io/stomp-websocket/codo/class/Client.html#connect-dynamic 참조
// over 메서드는 사용자가 사용할 WebSocket을 지정할 수 있도록 하는 Stomp.client()의 대안
// import { over } from 'stompjs';
// import SockJS from 'sockjs-client';
// import { io } from "socket.io-client"

import '../css/Chat.css'

// let socket = new WebSocket("ws://localhost:8086/gigwork/replyEcho")
const Chat = () => {

  // 화면 출력 체크용 임시 데이터
  localStorage.setItem("id", "test9")

  // 채팅 방 정보들을 저장할 변수
  const [chatroomList, setChatroomList] = useState([]);
  // 현재 접속할 채팅 방 정보를 저장할 변수
  const [crtChtR, setCrtChtR] = useState('')
  useEffect(() => {
    //화면로딩시 채팅 방 정보를 서버에서 가져온다.
    axios
      .post('gigwork/chat/roomInfo', { id: localStorage.getItem("id") })
      .then(res => {
        setChatroomList(res.data)
        setCrtChtR(res.data[0].cr_seq)
      })
      .catch(e => console.log(e));
  }, [])
  // 채팅방 정보를 바꿔줄 onClick 이벤트리스너
  const changeChtR = (e) => {
    setCrtChtR(e.target.getAttribute("roomnum"))
  }

  // 채팅 내용을 저장할 변수
  const [chatContentList, setChatContentList] = useState([]);
  // 채팅 방 정보가 업데이트되면 채팅 내용을 가져온다.
  useEffect(() => {
    chatroomList !== [] &&
      axios
        .post('gigwork/chat/content', { roomNum: crtChtR })
        .then(res => setChatContentList(res.data))
        .catch(e => console.log(e));
  }, [chatroomList, crtChtR])


  // 채팅 메세지를 저장할 변수
  const [chatMessage, setChatMessage] = useState("");
  //메세지 입력창의 변화(onChange)를 감지해서 그 값을 userData의 message에 넣어줌
  const handleMessage = (event) => {
    setChatMessage(event.target.value);
  }
  // input에서 엔터 입력시 전송버튼 누른거와 같은 효과를 주기 위한 함수
  const enterPress = (e) => {
    e.keyCode == 13 && chatInputSend()
  }


  //socket 연결
  const [socket, setSocket] = useState();
  
  function connect () {
    let ws = new WebSocket("ws://localhost:8086/gigwork/replyEcho")
    setSocket(ws)
    ws.onopen = () => {
      console.log("websocket: connected")
      // ws.send("sending message from client-server")
  
      ws.onmessage = function (event) {
        console.log(event.data + '\n');
      };
    }
    ws.onclose = function (event) { console.log('Info: connection closed.'); 
  // setTimeout( function(){connect()}, 1000)
};
    ws.onerror = function (event) { console.log('Info: connection closed.'); };
    setSocket(ws);
  }

  useEffect(()=>{
    connect();
  },[])
  
  let now = new Date();

  function timestamp(){
    var today = new Date();
    today.setHours(today.getHours());
    return today.toISOString().replace('T', ' ').substring(0, 19);
}

  const chatInputSend = (e) => {
    if (socket.readyState !== 1) return;
      socket.send(JSON.stringify({cc_seq: 0, talker: localStorage.getItem("id"), msg: chatMessage, msg_time: now, cr_seq: crtChtR}));
      console.log(chatMessage)
      axios
        .post('gigwork/chat/inputContent', {cc_seq: 0, talker: localStorage.getItem("id"), msg: chatMessage, msg_time: now, cr_seq: crtChtR})
        .then(res => console.log(res))
        .catch(e => console.log(e));
      setChatContentList(chatContentList.concat({cc_seq: null, talker: localStorage.getItem("id"), msg: chatMessage, msg_time: timestamp(), cr_seq: crtChtR}))
      setChatMessage("")
  }




  









  //현재 접속해있는 유저의 정보를 저장
  const [userData, setUserData] = useState({
    username: localStorage.getItem("id"),
    receivername: '',
    connected: false,
    message: ''
  });







  return (
    <div className='top_div' id='chatHead'>
      <div>
        <div className='leftBox'>
          {chatroomList.map((item) => (<div onClick={changeChtR} className='chatroomTab' key={item.cr_seq} roomnum={item.cr_seq}><span roomnum={item.cr_seq}>{item.partner_id === localStorage.getItem("id") ? item.mem_id : item.partner_id}</span><span roomnum={item.cr_seq}>{item.cr_date}</span></div>))}
        </div>
        <div className='rightBox'>
          {chatroomList !== [] && chatContentList.map((item, idx) => (<div className={item.talker === localStorage.getItem("id") ? 'me' : 'opp'} key={idx + item.talker}><span>{item.msg}</span><span>{item.msg_time.substr(11, 5)}</span></div>))}
          <div className='inputBox'>
            <input type='text' onChange={handleMessage} onKeyUp={enterPress} placeholder='메세지 입력...' value={chatMessage} autoFocus></input>
            <button onClick={chatInputSend}>전송</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat