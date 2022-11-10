import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// https://stomp-js.github.io/stomp-websocket/codo/class/Client.html#connect-dynamic 참조
// over 메서드는 사용자가 사용할 WebSocket을 지정할 수 있도록 하는 Stomp.client()의 대안
// import { over } from 'stompjs';
// import SockJS from 'sockjs-client';
// import { io } from "socket.io-client"

import '../css/Chat.css'

const Chat = ({ socket, connect }) => {

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
        setCrtChtR({ cr_status: res.data[0].cr_status, roomnum: res.data[0].cr_seq, partner_nick: res.data[0].partner_nick === localStorage.getItem("nick") ? res.data[0].mem_nick : res.data[0].partner_nick, post_num: res.data[0].post_num })
      })
      .catch(e => console.log(e));
  }, [])
  // 채팅방이 연결된 게시물의 정보를 저장할 변수
  const [postInfo, setPostInfo] = useState({})
  useEffect(() => {
    //채팅방이 연결된 게시물 정보를 가져온다.
    crtChtR.post_num !== undefined && axios
      .post('gigwork/chat/getPostInfo', { post_num: crtChtR.post_num })
      .then(res => setPostInfo(res.data))
      .catch(e => console.log(e));
  }, [crtChtR])
  // 채팅방 정보를 바꿔줄 onClick 이벤트리스너
  const changeChtR = (e) => {
    const pn = e.currentTarget.getAttribute("post_num")
    axios
      .post('gigwork/chat/roomInfo', { nick: localStorage.getItem("nick") })
      .then(res => {
        setChatroomList(res.data)
        setCrtChtR({
          cr_status: res.data.find(d => d.post_num == pn).cr_status,
          roomnum: res.data.find(d => d.post_num == pn).cr_seq,
          partner_nick: res.data.find(d => d.post_num == pn).partner_nick === localStorage.getItem("nick") ? res.data.find(d => d.post_num == pn).mem_nick : res.data.find(d => d.post_num == pn).partner_nick,
          post_num: res.data.find(d => d.post_num == pn).post_num
        })
      })
      .catch(e => console.log(e));
    axios
      .post('gigwork/chat/getPostInfo', { post_num: e.currentTarget.getAttribute("post_num") })
      .then(res => setPostInfo(res.data))
      .catch(e => console.log(e));
  }

  // 채팅 내용을 저장할 변수
  const [chatContentList, setChatContentList] = useState([]);
  // 채팅 방 정보가 업데이트되면 채팅 내용을 가져온다.
  useEffect(() => {
    chatroomList.length !== 0 &&
      axios
        .post('gigwork/chat/content', { roomnum: crtChtR.roomnum })
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

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });



  let now = new Date();

  function timestamp() {
    var today = new Date();
    today.setHours(today.getHours());
    return today.toISOString().replace('T', ' ').substring(0, 19);
  }

  const chatInputSend = (e) => {
    if (socket.readyState !== 1) return;
    //연결된 웹소켓서버에 정보를 전달
    socket.send(JSON.stringify({ talker: localStorage.getItem("nick"), msg: chatMessage, msg_time: now, sendto: crtChtR.partner_nick, cr_seq: crtChtR.roomnum }));
    //서버 저장을 위한 axois
    axios
      .post('gigwork/chat/inputContent', { cc_seq: 0, talker: localStorage.getItem("nick"), msg: chatMessage, msg_time: now, cr_seq: crtChtR.roomnum })
      .then(res => console.log(res))
      .catch(e => console.log(e));
    setChatContentList(chatContentList.concat({ cc_seq: null, talker: localStorage.getItem("nick"), msg: chatMessage, msg_time: timestamp(), cr_seq: crtChtR.roomnum }))
    setChatMessage("")
  }

  //소켓에서 오는 메세지를 받는 함수
  socket.onmessage = function (event) {
    let message = JSON.parse(event.data);
    console.log(message);
    message.talker !== undefined &&
    setChatContentList(chatContentList.concat({ cc_seq: 0, talker: message.talker, msg: message.msg, msg_time: message.msg_time, cr_seq: message.cr_seq }))
  };

  // 게시물로 이동
  const navigate = useNavigate()
  const goToDetail = () => {
    navigate('/JOdetail?post_num=' + crtChtR.post_num)
  }

  // 거래 시작, 완료 버튼
  const commissionStart = () => {
    //chattingroom의 cr_status를 변경, post도 거래전->거래중 변경
    if (postInfo.status === '거래전' && crtChtR.cr_status === 'c') {
      axios
        .post('gigwork/chat/updateCR', { roomnum: crtChtR.roomnum, post_num: crtChtR.post_num })
        .then(res => setPostInfo(res.data))
        .catch(e => console.log(e));
      crtChtR.cr_status = 't'
      setCrtChtR(crtChtR)
    } else if (postInfo.status === '거래중' && postInfo.mem_id === localStorage.getItem("id")) {
      axios
        .post('gigwork/chat/updateCR2', { roomnum: crtChtR.roomnum, post_num: crtChtR.post_num, partner_nick: localStorage.getItem("nick")===crtChtR.mem_nick?crtChtR.mem_nick:crtChtR.partner_nick})
        .then(res => setPostInfo(res.data))
        .catch(e => console.log(e));
      
      navigate('/EVLmanner?nick=' + (localStorage.getItem("nick")===crtChtR.mem_nick?crtChtR.mem_nick:crtChtR.partner_nick))
    }
  }

  return (
    <div className='top_div' id='chatHead'>
      <div>
        <div className='leftBox'>
          {chatroomList.map((item) => (<div onClick={changeChtR}
            className='chatroomTab'
            key={item.cr_seq}
            post_num={item.post_num}>
            <span>{item.partner_nick === localStorage.getItem("nick") ? item.mem_nick : item.partner_nick}</span>
            <span>{item.cr_date}</span>
          </div>))}
        </div>
        <div className='rightBox'>
          <div className='topRightBox'>
            <span onClick={goToDetail}>{postInfo.status} | {postInfo.title}</span>
            {(postInfo.status === '거래전' || crtChtR.cr_status === 't') && <button onClick={commissionStart}>{postInfo.status === '거래전' && '거래 시작하기'}{postInfo.status === '거래중' && crtChtR.cr_status === 't' && '거래 완료하기'}</button>}
          </div>
          <div className='chatContentListBox' ref={scrollRef}>
            {chatroomList !== [] && chatContentList.map((item, idx) => (<div className={item.talker === localStorage.getItem("nick") ? 'me' : 'opp'} key={idx + item.talker}><span>{item.msg}</span><span>{item.msg_time.substr(11, 5)}</span></div>))}
          </div>
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