import React ,{useState}from 'react';

const Login = (props) => {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")



  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
}
const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
}
const onSubmitHandler = (event) => {
    // page refresh를 막아준다
    event.preventDefault();

}


  return (
<div>
        
            <form >
                <span>이메일</span>
                <input type = "email" name='email' value = {email} onChange={onEmailHandler}/>
                <span>비밀번호</span>
                <input type = "password" name='password' value = {password} onChange={onPasswordHandler}/>
                <br/>
                <button type = 'submit' name='login'>이메일 로그인</button>
            </form>
        </div>
  )
}

export default Login;