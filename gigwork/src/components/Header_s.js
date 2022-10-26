import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import Toast from 'react-bootstrap/Toast';
import Offcanvas from 'react-bootstrap/Offcanvas';

import '../css/Header.css'
import nolnyeon from '../asset/img/nolnyeon.png'
import menuImg from '../asset/img/menu.png'
import alarmOn from '../asset/img/alarmOn.png'
import alarmOff from '../asset/img/alarmOff.png'
import user from '../asset/img/user.png'

const Header_s = () => {

    function Login(props) {

        const navigate = useNavigate()
        const isLoggedIn = props.isLoggedIn;
    
        const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
          <img style={{marginRight: '8px'}} src={user} ref={ref} onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }} />
        ));
    
        const goToChat = () => {
          navigate('/chat')
        }
    
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
                <Dropdown.Item eventKey="1">마이페이지</Dropdown.Item>
                <Dropdown.Item onClick={goToChat} href='/chat' eventKey="2">채팅방</Dropdown.Item>
                <Dropdown.Item eventKey="3">로그아웃</Dropdown.Item>
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

  const [menu, setMenu] = useState(false);
  const handleClose = () => setMenu(false);
  const handleShow = () => setMenu(true);

    return (
        <div className='top_div' id='header'>
            <div className='desktopHeader'>
                <div className='leftSection'>
                <img id='menuImg' src={menuImg} onClick={handleShow}/>
                </div>
                <div className='middleSection'>
                    <Link to='/'><img id='logo' src={nolnyeon} /></Link>
                </div>
                <Login isLoggedIn='tue' />
            </div>
            <div className='alarmList_s'>
        <Toast onClose={toggleAlarm} show={alarm} animation={false}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">알림 제목</strong>
            <small>10분 전</small>
          </Toast.Header>
          <Toast.Body>알림 내용</Toast.Body>
        </Toast>
        <Toast onClose={toggleAlarm} show={alarm} animation={false}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">알림 제목</strong>
            <small>10분 전</small>
          </Toast.Header>
          <Toast.Body>알림 내용</Toast.Body>
        </Toast>
        <Offcanvas show={menu} onHide={handleClose} placement='top'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>메뉴</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>도움받기</p>
          <p>도움주기</p>
          <p>커뮤니티</p>
        </Offcanvas.Body>
      </Offcanvas>
      </div>
    </div>
       
        
    )
}

export default Header_s