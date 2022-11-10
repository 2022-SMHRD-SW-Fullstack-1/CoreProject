import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/MyBookmark.css'
import MPmenu from '../components/MPmenu'
import { useNavigate } from 'react-router-dom'

const MyBookmark = () => {
  var myId = { mem_id: (localStorage.id) }

  const [postcontent, setPostcontent] = useState([])
  const [checkItems, setCheckItems] = useState(false);
  const [postnum, setPostnum] = useState();
  

  const navigate = useNavigate()
  const goToDetail=(e)=>{
    const post_num = e.target.getAttribute("name")
    navigate(encodeURI('/JOdetail?post_num='+post_num))
}

  const handleAllcheck=(e, postnum)=>{
    if(e.target.checked==true){
    setPostnum(e.target.getAttribute("post_num"))
    console.log(e.target.getAttribute("post_num"))
   
            const checkArray = []; //checkArray선언
           //el=element
      postcontent.forEach((el)=>checkArray.push(el.item.POST_NUM))
      setCheckItems(checkArray);
      }else{
      //전체 선택 해제 시 빈 상태로
       setCheckItems([]);
      }
      
      
      }
    

  const clickCancleBookmark=()=>{
    console.log(postnum)

    const config = { "Content-Type": 'application/json' };

    axios
            .post('gigwork/my/mybookmark',
                { mem_id: localStorage.getItem("id"), post_num: postnum }, config)
            .then(res => { console.log(res.data) })
            .catch(e => console.log(e))
    
            axios
            .post('gigwork/my/getmybookmark', myId)
            .then((res) => {
              setPostcontent(res.data)
              console.log('데이터가 왓따..', res.data)
            })
            .catch(e => console.log('에러!', e))

  }

  useEffect(() => {

    axios
      .post('gigwork/my/getmybookmark', myId)
      .then((res) => {
        setPostcontent(res.data)
        console.log('데이터가 왓따..', res.data)
      })
      .catch(e => console.log('에러!', e))
  }, [])


  return (
    <div className='top_div'>
      <MPmenu />

      <div className='wholeBox'>


        <div className='bookmarkHeader'>
          <button id='cancelbtn' onClick={clickCancleBookmark}  >찜취소</button>
        </div>
        <div className='contentPart'>
          <div className='oneContent'>
           
            
            </div>
            <table id='tablepart'>
            <th><input type='checkbox'/></th>
            <th><span>게시글 번호</span></th>
            <th><span>근무일자</span></th>
            <th><span>제목</span></th>
            <th><span>수당</span></th>
          
            {postcontent.map((item, idx) =>
              <tr>
                <td id='trpart'><input type='checkbox' post_num={item.POST_NUM} onChange={handleAllcheck} value={checkItems}></input></td>
                <td id='trpart'><span key={item + idx} >{item.POST_NUM}</span></td>
                <td id='trpart'><span>{item.WORKTIME_S.replace('T', ' ').replace(/\..*/, '').substring(0, 16)}</span></td>
                <td id='trpart'><span  name = {item.POST_NUM} onClick={goToDetail}>{item.TITLE}</span><br /></td>
                <td id='trpart'><span>{item.POST_PAY}</span></td>
              </tr>)}
              </table>


         
        </div>
      </div >

    </div>
  )
}

export default MyBookmark