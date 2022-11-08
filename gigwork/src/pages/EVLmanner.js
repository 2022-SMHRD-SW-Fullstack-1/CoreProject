import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import bStar from '../asset/imgSJ/blankStar.png'
import star from '../asset/imgSJ/star.png'

const EVLmanner = () => {
  
    // // 내 아이디
    // let myId = localStorage.getItem('id')
    // // 평가 대상 아이디
    // var str = decodeURI(window.location.search);
    // const params = new URLSearchParams(str)
    // const oppId = {id : params.get('id')}

// 임시 값
    let myId = 'tjdwns65';
    let oppId = 'chotjdwns123@naver.com'
// 임시 값
// 상대 아이디를 쿼리스트링으로 넘겨주는김에 닉네임도 같이 넘겨주면 좋을듯


 const navigate = useNavigate()


  const [starList,setStarList] = useState([1,2,3,4,5])

  const [point,setPoint] =useState(5);

const changeStar=(e)=>{

    if(e.target.id==5){
        document.querySelectorAll('img')[4].setAttribute('src',star)
        document.querySelectorAll('img')[5].setAttribute('src',star)
        document.querySelectorAll('img')[6].setAttribute('src',star)
        document.querySelectorAll('img')[7].setAttribute('src',star)
        document.querySelectorAll('img')[8].setAttribute('src',star)
    }else if(e.target.id==4){
        document.querySelectorAll('img')[4].setAttribute('src',star)
        document.querySelectorAll('img')[5].setAttribute('src',star)
        document.querySelectorAll('img')[6].setAttribute('src',star)
        document.querySelectorAll('img')[7].setAttribute('src',star)
        document.querySelectorAll('img')[8].setAttribute('src',bStar)
    }else if(e.target.id==3){
        document.querySelectorAll('img')[4].setAttribute('src',star)
        document.querySelectorAll('img')[5].setAttribute('src',star)
        document.querySelectorAll('img')[6].setAttribute('src',star)
        document.querySelectorAll('img')[7].setAttribute('src',bStar)
        document.querySelectorAll('img')[8].setAttribute('src',bStar)
    }else if(e.target.id==2){
        document.querySelectorAll('img')[4].setAttribute('src',star)
        document.querySelectorAll('img')[5].setAttribute('src',star)
        document.querySelectorAll('img')[6].setAttribute('src',bStar)
        document.querySelectorAll('img')[7].setAttribute('src',bStar)
        document.querySelectorAll('img')[8].setAttribute('src',bStar)
    }else{
        document.querySelectorAll('img')[4].setAttribute('src',star)
        document.querySelectorAll('img')[5].setAttribute('src',bStar)
        document.querySelectorAll('img')[6].setAttribute('src',bStar)
        document.querySelectorAll('img')[7].setAttribute('src',bStar)
        document.querySelectorAll('img')[8].setAttribute('src',bStar)
    }

    
    setPoint(e.target.id)
}

const resStarList = starList.map((item,idx)=><img src={star} key={item+idx} onClick={changeStar} id={idx+1}></img>)
  
let now = new Date();
let year = String(now.getFullYear());
let month = String(now.getMonth()+1);
let date = String(now.getDate());

let today = year+'-'+(month.padStart(2,'0'))+'-'+(date.padStart(2,'0'))

const writeSay = (e)=>{
    setSayInfo(e.target.value)
    console.log(sayInfo)
}
const [sayInfo,setSayInfo]=useState('')

const [evlInfo,setEvlInfo] = useState({})

useEffect(()=>{
    setEvlInfo({targetId:oppId,oppId:myId,evlPoint:point,evlContent:sayInfo,evlDate:today})
},[oppId,myId,point,sayInfo])

const saveEvl=()=>{
    axios
    .post('/gigwork/profile/evl',evlInfo)
    .then(res=>console.log(res))
    .catch(e=>console.log(e))

    navigate('/')
}

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
                <span id='savePF'onClick={saveEvl}>평가 남기기</span>
            </div>
        </div>
    </div>
  )
}

export default EVLmanner