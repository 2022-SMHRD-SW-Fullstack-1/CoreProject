import React, { useState } from 'react'
import '../css/Chat.css'
import chat from '../asset/img/chat.png'

const Chat = () => {

  // 화면 출력 체크용 임시 데이터
  let temp = [{name: '사용자1', lastChatDate: '3분전'}, {name: '사용자2', lastChatDate: '5분전'}]
  let chatContent = [{side: 'opp', text: '안녕하세요~', date: '오후 1:03'},
                    {side: 'me', text: '안녕하세요!', date: '오후 1:05'},
                    {side: 'me', text: '지금 바로 가능할까요?', date: '오후 1:06'}]
  

  return (
    <div className='top_div' id='chatHead'>
      <div>
        <div className='leftBox'>
          {temp.map((item,idx) => (<div className='chatroomTab' key={idx+item.name}><span>{item.name}</span><span>{item.lastChatDate}</span></div>))}
        </div>
        <div  className='rightBox'>
          {chatContent.map((item, idx) => (<div className={item.side} key={idx+item.side}><span>{item.text}</span><span>{item.date}</span></div>))}
          <div className='inputBox'>
            <input type='text' placeholder='메세지 입력...' autoFocus></input>
            <button>전송</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat