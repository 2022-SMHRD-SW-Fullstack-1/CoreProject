import axios from 'axios'
import React, { useEffect, useState } from 'react'
import man from '../asset/imgSJ/검정색사람.png'
import MPmenu from '../components/MPmenu'

const MPprivacy = () => {

  const idInfo = {id : localStorage.getItem('id')}
  const [viewInfo,setViewInfo] = useState({data:{img_src:'',name:'',mem_id:idInfo,mem_phone:''}});
  useEffect(()=>{
    axios
    .post('gigwork/profile/privacy',idInfo)
        .then(res=>setViewInfo(res.data))
        .catch(e=>console.log(e))
  },[setViewInfo])

  return (
    <div className='top_div'>
        <MPmenu></MPmenu>
        <div className='myPrivacy'>
        <img src={viewInfo.img_src}></img>
        <div className='myPrivacyImgDiv'></div>
        <div><p>닉네임</p></div>
        <div><span>{viewInfo.name}</span><span className='changeInfo'>수정</span></div>
        <div><p>이메일</p></div>
        <div><span>{viewInfo.mem_id}</span><span className='changeInfo'>수정</span></div>
        <div><p>전화번호</p></div>
        <div><span>{viewInfo.mem_phone}</span><span className='changeInfo'>수정</span></div>
        </div>
    </div>
  )
}

export default MPprivacy