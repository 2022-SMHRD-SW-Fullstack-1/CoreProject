import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/MyBookmark.css'
import MPmenu from '../components/MPmenu'
import { useNavigate } from 'react-router-dom'


const MyPost = () => {
    var myId = { mem_id: (localStorage.id) }
  
    const [postList,setPostList]=useState([{}])
    useEffect(() => {

        axios
          .post('gigwork/profile/bringPost', myId)
          .then(res => {setPostList( res.data.JasonArray)
                    console.log(res.data.JasonArray)})
          .catch(e => console.log('에러!', e))
      }, [])
  
  const resPostList = postList.map((item,idx)=>
      <tr key={item+idx}>
        <td align='left'>{item.post_num}</td>
        <td><img src={item.urgent} className='juImg'></img></td>
        <td>{item.title}</td>
        <td><img src={item.post_offer_yn} className='jeImg'></img></td>
        <td>{item.post_pay} 원</td>
      </tr>
  )
  
  
    return (
    <div className='top_div'>
      <MPmenu />

      <div className='wholeBox'>


        <div className='bookmarkHeader'>
          <button id='cancelbtn'>글 정렬</button>
        </div>
        <div className='contentpart'>
          <div className='oneContent'>
           
            
            </div>
            <table id='tablepart'>
                <th><span>게시글 번호</span></th>
                <th><span>급구</span></th>
                <th><span>게시글 제목</span></th>
                <th><span>제의받기</span></th>
                <th><span>수당</span></th>
                {resPostList}
            </table>


         
        </div>
      </div >

    </div>
  )
}

export default MyPost