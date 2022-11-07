import React, { useState } from 'react'
import bStar from '../asset/imgSJ/blankStar.png'
import star from '../asset/imgSJ/star.png'

const EVLmanner = () => {
  
    // 내 아이디
    let myId = localStorage.getItem('id')
    // 평가 대상 아이디
    var str = decodeURI(window.location.search);
    const params = new URLSearchParams(str)
    const oppId = {id : params.get('id')}

  const [starList,setStarList] = useState([1,2,3,4,5])

const changeStar=(e)=>{
    if(e.target.id>4){
        document.querySelectorAll('img')[6].setAttribute('src',star)
        document.querySelectorAll('img')[7].setAttribute('src',star)
        document.querySelectorAll('img')[8].setAttribute('src',star)
        document.querySelectorAll('img')[9].setAttribute('src',star)
        document.querySelectorAll('img')[10].setAttribute('src',star)
    }else if(e.target.id>3){
        document.querySelectorAll('img')[6].setAttribute('src',star)
        document.querySelectorAll('img')[7].setAttribute('src',star)
        document.querySelectorAll('img')[8].setAttribute('src',star)
        document.querySelectorAll('img')[9].setAttribute('src',star)
        document.querySelectorAll('img')[10].setAttribute('src',bStar)
    }else if(e.target.id>2){
        document.querySelectorAll('img')[6].setAttribute('src',star)
        document.querySelectorAll('img')[7].setAttribute('src',star)
        document.querySelectorAll('img')[8].setAttribute('src',star)
        document.querySelectorAll('img')[9].setAttribute('src',bStar)
        document.querySelectorAll('img')[10].setAttribute('src',bStar)
    }else if(e.target.id>1){
        document.querySelectorAll('img')[6].setAttribute('src',star)
        document.querySelectorAll('img')[7].setAttribute('src',star)
        document.querySelectorAll('img')[8].setAttribute('src',bStar)
        document.querySelectorAll('img')[9].setAttribute('src',bStar)
        document.querySelectorAll('img')[10].setAttribute('src',bStar)
    }else{
        document.querySelectorAll('img')[6].setAttribute('src',star)
        document.querySelectorAll('img')[7].setAttribute('src',bStar)
        document.querySelectorAll('img')[8].setAttribute('src',bStar)
        document.querySelectorAll('img')[9].setAttribute('src',bStar)
        document.querySelectorAll('img')[10].setAttribute('src',bStar)
    }
}

const resStarList = starList.map((item,idx)=><img src={star} key={item+idx} onClick={changeStar} id={idx+1}></img>)
  
const writeSay = (e)=>{
    setSayInfo(e.target.value)
    console.log(sayInfo)
}
const [sayInfo,setSayInfo]=useState('')

const [evlInfo,setEvlInfo] = useState({})



    return (
    <div className='top_div'>
        <div className='mannerContainer'>
            <div>
                <h1>00님 매너평가 남기기</h1>
            </div>
            <div>
            <h3>별점 평가</h3>
            </div>
            <div className='starContainer'>
                {resStarList}
            </div>
            <div>
                <h3>00님께 남길 말</h3>
            </div>
            <div className='mannerCommentContainer'> 
                <textarea  id="say" rows="2" onChange={writeSay}></textarea>
            </div>
            <div>
                <span id='savePF'>평가 남기기</span>
            </div>
        </div>

    </div>
  )
}

export default EVLmanner