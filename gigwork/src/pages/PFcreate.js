import '../css/SJ.css'
import React, { useEffect, useRef, useState } from 'react'
import { Await, Link } from 'react-router-dom'
import man from '../asset/imgSJ/검정색사람.png'
import MPmenu from '../components/MPmenu'
import axios, { Axios } from 'axios'


let choiceCate =[];

const PFcreate = () => {


    let testId = "test1";




let [cateOne,setCateOne] = useState('N');
let [cateTwo,setCateTwo] = useState('N');
let [cateThree,setCateThree] = useState('N');


    const clickBtn=(e)=>{
        if(e.target.className=="pfCategoryBox"){
            if(choiceCate.length!==3){
                e.target.classList.add('pfClickBtn')
            }
        }else{
            e.target.classList.remove('pfClickBtn')
        }

        if(choiceCate.includes(e.target.innerText)){
            for(let i =0; i<choiceCate.length;i++){
                if(choiceCate[i]==e.target.innerText){
                    choiceCate.splice(i,1);
                    i--;
                }
            }
        }else{
            if(choiceCate.length==3){
                alert("최대 3가지만 가능합니다")
            }else if(choiceCate.length==0){
                choiceCate.push(e.target.innerText)
                setCateOne(e.target.innerText)
            }else if(choiceCate.length==1){
                choiceCate.push(e.target.innerText)
                setCateTwo(e.target.innerText)
            }else if(choiceCate.length==2){
                choiceCate.push(e.target.innerText)
                setCateThree(e.target.innerText)
            }

        }
    }



let category =[
    "동행/돌봄","배달/장보기","동물/벌레퇴치",
    "설치/조립","청소/집안일","역할대행",
    "운반/운송","운전/대리/카풀","재택/부업"
]
let resCate = category.map((item)=>
<button className='pfCategoryBox' id='pfCateHover' onClick={clickBtn} key={item}>
    {item}</button>)



let [proCreInfo,setProCreInfo]=useState('')

let [sayInfo,setSayInfo]=useState('')
let [openInfo,setOpenInfo]=useState('')
let [closeInfo,setCloseInfo]=useState('')

const writeSay = (e)=>{
    setSayInfo(e.target.value)
    console.log(sayInfo)
}
const openDate=(e)=>{
        setOpenInfo(e.target.value)
        console.log(e.target.value)
}
const closeDate=(e)=>{
        setCloseInfo(e.target.value)
}

let [imgSrcInfo,setImgSrcInfo] = useState('N');


useEffect(()=>{
    setProCreInfo({id:testId,say:sayInfo,imgSrc:imgSrcInfo,cOne:cateOne,cTwo:cateTwo,cThree:cateThree,openDate:openInfo,closeDate:closeInfo})
},[cateOne,cateTwo,cateThree,sayInfo,openInfo,closeInfo])

// useEffect(()=>{
//     setProCreInfo({testId,sayInfo,date:openInfo,closeInfo})
// },[sayInfo,openInfo,closeInfo])

// 10월 31일

const handleImg=(e)=>{
    console.log(e.target.value);
    console.log(e.target.files[0]);
}


// 10월 31일

// 11월 1일(내 위도경도 얻기)

// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(function(position){
//             console.log("위도",position.coords.latitude);
//             console.log("경도",position.coords.longitude)
//         },function(error){
//             console.error(error);
//         },{
//             enableHighAccuracy:false,
//             maximumAge:0,
//             timeout:Infinity
//         });
//     }else{
//         alert('GPS를 지원하지 않습니다')
//     }
// }

// getLocation()


// 백엔드에서 정보가져와 저장하기
// const [message, setMessage] = useState('');
// useEffect(()=>{
//     axios
//     .post('gigwork/profile/select')
//      .then(res=>setMessage(res.data))
//     .catch(e=>console.log(e));
// },[])





// 

// 11월 1일

const saveProfile=(e)=>{
    if(openInfo>closeInfo){
        alert("올바른 날짜를 입력해주세요")
        alert(choiceCate)
        e.preventDefault()
    }else{
        console.log(proCreInfo)


        axios
        .post('/gigwork/profile/create', proCreInfo)
        .then(res=>console.log(res))
        .then(choiceCate=[])
        .catch(e=>console.log(e));
    }
}

  return (
    <div className='top_div'>
        <MPmenu></MPmenu>
        <div className='pfCreateDiv'>
            <div className="pfImgDiv">
                <img src={man} height="120px"/>
                <input type='file' onChange={handleImg}></input>


                <h2>닉네임 : 님</h2>
            </div>
            <div className='pfCategory'>
                <div>
                    <span>자신있는 업무 (최대 3가지)</span>
                </div>
                <div>
                {resCate}
                </div>
            </div>
            <div className='pfCategory'>
                <div>
                하고싶은 말
                </div>
                <textarea  id="say" rows="3" onChange={writeSay}></textarea>
                </div>
            <div>
                활동 내역
                <div className='pfActive'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className='pfDate'>
                <div>
                    <br/>
                공개기간
                </div>
                <input type="date" onChange={openDate}></input>부터
                <input type="date" onChange={closeDate}></input>까지
            </div>
            <div className='pfSaveDiv'>
                <br/>
            <Link to='/PFmyview' id='savePF' onClick={saveProfile}>저 장</Link>
            </div>
        </div>
    </div>
  )
}

export default PFcreate