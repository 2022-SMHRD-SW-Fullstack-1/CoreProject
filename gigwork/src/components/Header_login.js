import React, { useEffect, useRef, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Link, useLocation, useNavigate } from 'react-router-dom'

import nolnyeon from '../asset/img/nolnyeon.png'
import searchIcon from '../asset/img/searchIcon.png'
import alarmOn from '../asset/img/alarmOn.png'
import alarmOff from '../asset/img/alarmOff.png'
import user from '../asset/img/user.png'
import chat from '../asset/img/chat.png'
import '../css/Header.css'
import axios from 'axios';

const Header_login = ({socket}) => {

  const navigate = useNavigate()

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <img style={{ marginRight: '8px' }} src={user} ref={ref} onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }} />
  ));

  // 로그아웃 기능
  const logout = () => {
    localStorage.removeItem("id")
    localStorage.removeItem("nick")
    if (socket.readyState === 1) { socket.close(); }
    navigate('/')
  }

  const goToChat = () => {
    navigate('/chat')
  }
  // 성준 시작
  const goToProfile = () => {
    var hasPro = '';
    axios
      .post('/gigwork/profile/hasPro', { id: localStorage.getItem('id') })
      .then(res => {
        hasPro = (res.data)
        if (hasPro == 0) {
          navigate('/PFnone')
        } else if (hasPro == 1) {
          navigate('/PFmyview?id=' + localStorage.getItem('id'))
        }
      })
      .catch(e => console.log(e));
  }
  // 성준 끝



  // 알림 메세지를 껏다켯다 할 조건
  const [alarm, setAlarm] = useState(false);
  const toggleAlarm = () => setAlarm(!alarm);

  // 알림 메세지가 있을때와 없을때 이미지 변환
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  function Alarm(props) {
    return props.isAlarmOn
      ? <img className='alarmImg' src={alarmOn} onClick={toggleAlarm} />
      : <img className='alarmImg' src={alarmOff} onClick={toggleAlarm} />
  }

  const closeBtnRef = useRef()
  useEffect(() => {
    console.log(closeBtnRef)
  }, [])

  //로그인 시 알림 목록을 가져옴
  const [alertList, setAlertList] = useState([])
  useEffect(() => {
    localStorage.getItem("nick") !== null
      && axios
        .post('gigwork/alert/getList', { mem_nick: localStorage.getItem("nick") })
        .then(res => setAlertList(res.data))
        .catch(e => console.log(e));
  }, [useLocation()])

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
        <div className='rightSection' id='rsLogin'>
          <Alarm isAlarmOn={isAlarmOn} />
          <Dropdown align='end'>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              Custom toggle
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.ItemText>{localStorage.getItem("nick")}</Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item onClick={goToProfile} eventKey="1">마이페이지</Dropdown.Item>
              <Dropdown.Item onClick={goToChat} eventKey="2">채팅방</Dropdown.Item>
              <Dropdown.Item onClick={logout} eventKey="3">로그아웃</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </div>
      </div>
      <div className='alarmList'>
        <ToastContainer position="top-end" className="p-3">
          {alertList.map((item) => (
            <Toast onClose={toggleAlarm} show={alarm} animation={false}>
              <Toast.Header ref={closeBtnRef}>
                <img style={{height: '20px'}} src={chat} className="rounded me-2" alt="" />
                <strong className="me-auto">{item.sendfrom}님이 채팅을 보냈습니다.</strong>
                <small>{item.alert_time}</small>
              </Toast.Header>
              <Toast.Body>{item.alert_cnt}</Toast.Body>
            </Toast>
          ))}
        </ToastContainer>
      </div>
    </div>
  )
}

export default Header_login