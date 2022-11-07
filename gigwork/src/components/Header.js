import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Toast from 'react-bootstrap/Toast';
import { Link, useNavigate } from 'react-router-dom'

import nolnyeon from '../asset/img/nolnyeon.png'
import searchIcon from '../asset/img/searchIcon.png'
import alarmOn from '../asset/img/alarmOn.png'
import alarmOff from '../asset/img/alarmOff.png'
import user from '../asset/img/user.png'
import '../css/Header.css'
import axios from 'axios';

const Header = () => {
// 성준 시작
  let mem_id = localStorage.getItem('id')
  let id = {id:mem_id}
  const [hasPro,setHasPro] = useState(2)
    axios
    .post('/gigwork/profile/hasPro', id)
    .then(res=>setHasPro(res.data))
    .catch(e=>console.log(e));
// 성준 끝

  function Login(props) {

    const navigate = useNavigate()
    const isLoggedIn = props.isLoggedIn;

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <img style={{marginRight: '8px'}} src={user} ref={ref} onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }} />
    ));

    const logout = () => {
      localStorage.removeItem("id")
      navigate('/')
    }

    const goToChat = () => {
      navigate('/chat')
    }
    // 성준 시작
    const goToProfile = () => {
      if(hasPro==0){
        navigate('/PFnone')
      }else if(hasPro==1){
        navigate('/PFmyview?id='+mem_id)
      }
    }
    // 성준 끝
    if (isLoggedIn == 'true') {
      return <div className='rightSection'>
        <Link to='/login'><button>로그인</button></Link>
        <Link to='/register'><button>회원가입</button></Link>
      </div>;
    } else {
      return <div className='rightSection' id='rsLogin'>
        <Alarm isAlarmOn='true' />
        <Dropdown align='end'>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            Custom toggle
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={goToProfile} eventKey="1">마이페이지</Dropdown.Item>
            <Dropdown.Item onClick={goToChat} href='/chat' eventKey="2">채팅방</Dropdown.Item>
            <Dropdown.Item onClick={logout} eventKey="3">로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </div>;
    }
  }

  // 알람 메세지를 껏다켯다 할 조건
  const [alarm, setAlarm] = useState(false);
  const toggleAlarm = () => setAlarm(!alarm);

  // 알람 메세지가 있을때와 없을때 이미지 변환
  function Alarm(props) {
    const isAlarmOn = props.isAlarmOn;
    return isAlarmOn == 'true'
      ? <img className='alarmImg' src={alarmOn} onClick={toggleAlarm} />
      : <img className='alarmImg' src={alarmOff} onClick={toggleAlarm} />
  }


  return (
    <div className='top_div' id='header'>
      <div className='desktopHeader'>
        <div className='leftSection'>
          <Link to='/'><img id='logo' src={nolnyeon} /></Link>
          <ul className='menu'>
            <span>도움받기</span>
            <span>도움주기</span>
            <span>커뮤니티</span>
          </ul>
        </div>
        <div className='searchBox'>
          <img id='searchIcon' src={searchIcon} />
          <input placeholder='어떤 서비스가 필요하세요?'></input>
        </div>
        <Login isLoggedIn={localStorage.getItem("id")===null?'true':'false'} />
      </div>
      
      <div className='alarmList'>
        <Toast onClose={toggleAlarm} show={alarm} animation={false}>
          <Toast.Header>
            <img className="rounded me-2" alt="" />
            <strong className="me-auto">알림 제목</strong>
            <small>10분 전</small>
          </Toast.Header>
          <Toast.Body>알림 내용</Toast.Body>
        </Toast>
        <Toast onClose={toggleAlarm} show={alarm} animation={false}>
          <Toast.Header>
            <img className="rounded me-2" alt="" />
            <strong className="me-auto">알림 제목</strong>
            <small>10분 전</small>
          </Toast.Header>
          <Toast.Body>알림 내용</Toast.Body>
        </Toast>
      </div>
    </div>
  )
}

export default Header