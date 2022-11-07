import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
// https://stomp-js.github.io/stomp-websocket/codo/class/Client.html#connect-dynamic 참조
// over 메서드는 사용자가 사용할 WebSocket을 지정할 수 있도록 하는 Stomp.client()의 대안
// import { over } from 'stompjs';
// import SockJS from 'sockjs-client';
// import { io } from "socket.io-client"

import '../css/Chat.css'

const Chat = ({socket, connect}) => {

  // 채팅 방 정보들을 저장할 변수
  const [chatroomList, setChatroomList] = useState([]);
  // 현재 접속할 채팅 방 정보를 저장할 변수
  const [crtChtR, setCrtChtR] = useState({})
  useEffect(() => {
    //화면로딩시 채팅 방 정보를 서버에서 가져온다.
    axios
      .post('gigwork/chat/roomInfo', { nick: localStorage.getItem("nick") })
      .then(res => {
        setChatroomList(res.data)
        setCrtChtR({roomnum: res.data[0].cr_seq})
      })
      .catch(e => console.log(e));
  }, [])
  // 채팅방 정보를 바꿔줄 onClick 이벤트리스너
  const changeChtR = (e) => {
    setCrtChtR({roomnum: e.target.getAttribute("roomnum"), partner_nick: e.target.getAttribute("pnick")})
  }

  // 채팅 내용을 저장할 변수
  const [chatContentList, setChatContentList] = useState([]);
  // 채팅 방 정보가 업데이트되면 채팅 내용을 가져온다.
  useEffect(() => {
    chatroomList.length !== 0 &&
      axios
        .post('gigwork/chat/content', {roomnum: crtChtR.roomnum})
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






  let now = new Date();

  function timestamp() {
    var today = new Date();
    today.setHours(today.getHours());
    return today.toISOString().replace('T', ' ').substring(0, 19);
  }

  const chatInputSend = (e) => {
    if (socket.readyState !== 1) return;
    console.log(crtChtR)
    //연결된 웹소켓서버에 정보를 전달
    socket.send(JSON.stringify({ talker: localStorage.getItem("nick"), msg: chatMessage, msg_time: now, sendto: crtChtR.partner_nick}));
    console.log(chatMessage)
    //서버 저장을 위한 axois
    axios
      .post('gigwork/chat/inputContent', { cc_seq: 0, talker: localStorage.getItem("nick"), msg: chatMessage, msg_time: now, cr_seq: crtChtR.roomnum })
      .then(res => console.log(res))
      .catch(e => console.log(e));
    setChatContentList(chatContentList.concat({ cc_seq: null, talker: localStorage.getItem("nick"), msg: chatMessage, msg_time: timestamp(), cr_seq: crtChtR }))
    setChatMessage("")
  }

  

  return (
    <div className='top_div' id='chatHead'>
      <div>
        <div className='leftBox'>
          {chatroomList.map((item) => (<div onClick={changeChtR} 
                                            className='chatroomTab' 
                                            key={item.cr_seq} 
                                            roomnum={item.cr_seq} 
                                            pnick={item.partner_nick === localStorage.getItem("nick") ? item.mem_nick : item.partner_nick}>
                                              <span roomnum={item.cr_seq} 
                                            pnick={item.partner_nick === localStorage.getItem("nick") ? item.mem_nick : item.partner_nick}>{item.partner_nick === localStorage.getItem("nick") ? item.mem_nick : item.partner_nick}</span>
                                              <span roomnum={item.cr_seq} 
                                            pnick={item.partner_nick === localStorage.getItem("nick") ? item.mem_nick : item.partner_nick}>{item.cr_date}</span>
                                            </div>))}
        </div>
        <div className='rightBox'>
          {chatroomList !== [] && chatContentList.map((item, idx) => (<div className={item.talker === localStorage.getItem("nick") ? 'me' : 'opp'} key={idx + item.talker}><span>{item.msg}</span><span>{item.msg_time.substr(11, 5)}</span></div>))}
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