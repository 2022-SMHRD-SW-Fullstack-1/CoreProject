import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Login = () => {

// 이메일 정보 얻기

const [emailPartOne,setEmailPartOne]=useState('')
const [emailPartTwo,setEmailPartTwo]=useState('naver.com')
const [email,setEmail] = useState('?')
const emailFirst=(e)=>{
  setEmailPartOne(e.target.value)
  setEmail(e.target.value+"@"+emailPartTwo)
}
const emailSecond=(e)=>{
  setEmailPartTwo(e.target.value)
  setEmail(emailPartOne+"@"+e.target.value)
  console.log(email)
}

// 이메일 정보 얻기

 // 패스워드 정보 얻기
 const [password,setPassword] =useState('')
 const handlePassword=(e)=>{
   setPassword(e.target.value)
   console.log(password)
 }
 // 패스워드 정보 얻기

  // 모든 정보 모으기
  const [loginInfo,setLoginInfo]=useState({})
  useEffect(()=>{
    setLoginInfo({id:email,pw:password})
    console.log(loginInfo);
  },[email,password])
  // 모든 정보 모으기

  // 정보 DB로 전송
  const letsLogin=()=>{
      axios
      .post('/gigwork/register/login', loginInfo)
      .then(res=>{
        userId =res.data
        loginCheck();
      
      })
      .catch(e=>console.log(e));

}
// 정보 DB로 전송
// 로그인 결과 정보
  // const [userId,setUserId] =useState('')
var userId =''
const loginCheck=()=>{

  if(userId==email){
    alert('로그인 성공')
    localStorage.setItem('id',email)
  }else{
    alert('로그인 실패') 
  }
}


// 로그인 결과 정보


  return (
    <div className='top_div'>
      <div className='loginContainer'>

        <div className='emailContainer'>
          <h1>로그인</h1>
          <br/>
          <p>이메일</p>
          <input type='text' onInput={emailFirst} ></input>
          @
          <input type='text' placeholder='naver.com' onInput={emailSecond} ></input>
        
        </div>
        <div>
         <p>비밀번호</p>
         <input type='password' onInput={handlePassword}></input>
        </div>
        <div>
          <div className='loginBtnContainer'>
            <span onClick={letsLogin}>로그인</span>
          </div>
          <div className='findOrRegi'>
            <div>비밀번호찾기</div>
            <div>회원가입</div>
          </div>
        </div>
        <div className='apiLoginContainer'>
          <div className='naverLogin'>네이버로 로그인</div>
          <div className='kakaoLogin'>카카오로 로그인</div>
          <div className='googleLogin'>구글로 로그인</div>
        </div>
      </div>
    </div>
  )
}

export default Login