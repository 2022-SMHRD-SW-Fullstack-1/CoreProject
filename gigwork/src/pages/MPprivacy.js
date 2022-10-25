import React from 'react'
import man from '../asset/imgSJ/검정색사람.png'
import MPmenu from '../components/MPmenu'

const MPprivacy = () => {
  return (
    <div className='top_div'>
        <MPmenu></MPmenu>
        <div className='myPrivacy'>
        <p>내 이미지</p>
        <div><img src={man}></img><span className='changeInfo'>수정</span></div>
        <p>닉네임</p>
        <div><span>열심히하는일꾼</span><span className='changeInfo'>수정</span></div>
        <p>이메일</p>
        <div><span>qwer1234@naver.com</span><span className='changeInfo'>수정</span></div>
        <p>전화번호</p>
        <div><span>010 - 1234 - 5678</span><span className='changeInfo'>수정</span></div>

        </div>
    </div>
  )
}

export default MPprivacy