import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/YS.css'

const Register = () => {

  const navigate = useNavigate();
  // 이메일 정보 얻기
  
  const [emailPartOne,setEmailPartOne]=useState('')
  const [emailPartTwo,setEmailPartTwo]=useState('naver.com')
  const [email,setEmail] = useState('')
  const emailFirst=(e)=>{
    setEmailPartOne(e.target.value)
    setEmail(e.target.value+"@"+emailPartTwo)
  }
  const emailSecond=(e)=>{
    setEmailPartTwo(e.target.value)
    setEmail(emailPartOne+"@"+e.target.value)
  }

  // 이메일 정보 얻기

  // 패스워드 정보 얻기
  const [password,setPassword] =useState('')
  const handlePassword=(e)=>{
    setPassword(e.target.value)
  }
  // 패스워드 정보 얻기

  // 전화번호 정보 얻기
  const [phoneNum,setPhoneNum] = useState('')
  const handlePhoneNum=(e)=>{
    setPhoneNum(e.target.value)
  }
  // 전화번호 정보 얻기

  // 이름 정보 얻기
  const [name,setName]=useState('')
  const handleName=(e)=>{
    setName(e.target.value)
  }
  // 이름 정보 얻기
  // 닉네임 정보 얻기
  const [nick,setNick]=useState('')
  const handleNick=(e)=>{
    setNick(e.target.value)
  }
  // 닉네임 정보 얻기
  // 생년월일 정보 얻기
  const [birth,setBirth]=useState(0)
  const handleBirth=(e)=>{
    setBirth((e.target.value.substr(0,4)-2023)*-1)
  }
  
  // 생년월일 정보 얻기
  // 성별 정보 얻기
  const [gender,setGender]=useState('')
  const handleGender=(e)=>{
    setGender(e.target.value)
  }
  // 성별 정보 얻기

  // 기본 정보
  const trust = 50;
  const memType = 'M'
  const [regiDate,setRegiDate]=useState('')
  useEffect(()=>{

    let now = new Date();
    let y = now.getFullYear()+""
    let m = now.getMonth()+1+""
    let d = now.getDate()+""
    setRegiDate(y+"-"+m.padStart(2,"0")+"-"+d.padStart(2,"0"))
  },[emailFirst])
  // 기본 정보
  // 위도경도얻기
  const [lat,setLat]=useState(0)
  const [lng,setLng]=useState(0)

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        },function(error){
            console.error(error);
        },{
            enableHighAccuracy:false,
            maximumAge:0,
            timeout:Infinity
        });
    }else{
        alert('GPS를 지원하지 않습니다')
    }
}
getLocation();
  // 위도경도얻기


  // 모든 정보 모으기
  const [allInfo,setAllInfo]=useState({})
  useEffect(()=>{
    setAllInfo({id:email,pw:password,name:nick,age:birth,gender:gender,phone:phoneNum,trust:trust,join_date:regiDate,lat:lat,lng:lng,mem_type:memType})
  },[email,password,nick,birth,gender,phoneNum,trust,regiDate,lat,lng,memType])
  // 모든 정보 모으기

// 정보 DB로 전송
const saveRegi=()=>{
  axios
  .post('/gigwork/register/create', allInfo)
  .then(res=>{console.log(res)
    navigate('/')})
  .catch(e=>console.log(e));
}
// 정보 DB로 전송

  return (
    <div className='top_div'>
      <div className='registerContainer'>
        <h1>회원가입</h1>
        <br />
        <div className='emailContainer'>
          <p>이메일</p>
          <input type='text' onChange={emailFirst}></input>
          @
          <input type='text' placeholder='naver.com' onChange={emailSecond}></input>
        </div>
        <div>
          <p>비밀번호</p>
          <input type='password' onChange={handlePassword}>
          </input>
        </div>
        <div>
          <p>휴대전화</p>
          <input type='text' onChange={handlePhoneNum}></input>
          </div>
        <div>
          <p>이름</p>
          <input type='text' onChange={handleName}></input>
        </div>
        <div>
          <p>사용할 닉네임</p>
          <input type='text' onChange={handleNick}></input>
        </div>
        <div className='birthGenderContainer'>
          <div>
            <p>생년월일 8자리(ex 19990101)</p>
            <input type='text' onChange={handleBirth}></input>
          </div>
          <div>
            <p>성별</p>
            <select onChange={handleGender}>
              <option hidden>--</option>
              <option>남</option>
              <option>여</option>
            </select>
          </div>
        </div>
        <div className='saveRegi' ><span onClick={saveRegi}>전 송</span></div>
      </div>
    </div>
  )
}

export default Register