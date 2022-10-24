import React, { useState } from 'react'
import '../css/Chat.css'
import chat from '../asset/img/chat.png'

const Chat = () => {

  let temp = [{name: '사용자1', lastChatDate: '3분전'}, {name: '사용자2', lastChatDate: '5분전'}]

  

  return (
    <div className='top_div' id='chatHead'>
      <div>
        <div className='leftBox'>
          {temp.map((item,idx) => (<div className='chatroomTab' key={idx+item.name}><span>{item.name}</span><span>{item.lastChatDate}</span></div>))}
        </div>
        <div  className='rightBox'>
          <div></div>
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