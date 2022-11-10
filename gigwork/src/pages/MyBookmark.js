import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/MyBookmark.css'
import MPmenu from '../components/MPmenu'

const MyBookmark = () => {
  var myId = { mem_id: (localStorage.id) }

  const [postcontent, setPostcontent] = useState([])
  const [checkItems, setCheckItems] = useState([]);



  useEffect(() => {

    axios
      .post('gigwork/my/getmybookmark', myId)
      .then((res) => {
        setPostcontent(res.data)
        console.log('데이터가 왓따..', res.data)
      })
      .catch(e => console.log('에러!', e))
  }, {})


  return (
    <div className='top_div'>
      <MPmenu />

      <div className='wholeBox'>


        <div className='bookmarkHeader'>
          <button id='cancelbtn'>찜취소</button>
        </div>
        <div className='contentpart'>
          <div className='oneContent'>
           
            
            </div>
            <table id='tablepart'>
            <th><input type='checkbox' name='selectAll'/></th>
            <th><span>게시글 번호</span></th>
            <th><span>근무일자</span></th>
            <th><span>제목</span></th>
            <th><span>수당</span></th>
          
            {postcontent.map((item, idx) =>
              <tr>
                <td><input type='checkbox'></input></td>
                <td><span key={item + idx}>{item.POST_NUM}</span></td>
                <td><span>{item.WORKTIME_S.replace('T', ' ').replace(/\..*/, '').substring(0, 16)}</span></td>
                <td><span>{item.TITLE}</span><br /></td>
                <td><span>{item.POST_PAY}</span></td>
              </tr>)}
              </table>


         
        </div>
      </div >

    </div>
  )
}

export default MyBookmark