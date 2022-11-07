import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MyPost = () => {

    const [receiveList, setReceiveList] = useState([])

    useEffect(()=>{
        axios
        .post('gigwork/post/postlist')
        .then((res)=>{
            setReceiveList(res.data)
            console.log(res.data)
            .catch(error=>console.log(error))
        })
    }, [])


  return (
    <div>
        <div>
            <span>찜목록</span>
            <div>
                <button>찜취소</button>
                <input type='checkbox'/> 
                <span>스크랩일</span>
                <span>제목</span>
                <span>근무일자</span>
                <span>근무장소</span>
                <span>수당</span>
            </div>
        </div>



    </div>
  )
}

export default MyPost