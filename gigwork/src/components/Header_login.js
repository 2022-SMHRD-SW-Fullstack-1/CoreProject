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

const Header_login = ({ socket }) => {

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
    localStorage.removeItem("lat")
    localStorage.removeItem("lng")
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
  const toggleAlarm = () => {
    setAlarm(!alarm)
    localStorage.getItem("nick") !== null
      && axios
        .post('gigwork/alert/getList', { mem_nick: localStorage.getItem("nick") })
        .then(res => setAlertList(res.data))
        .catch(e => console.log(e));
  };

  const toastHeaderClick = (e) => {
    if (e.target.tagName === 'BUTTON') {  // 클릭된 요소의 태그 이름이 BUTTON인지 확인
      axios
        .post('gigwork/alert/deleteAlert', { alert_seq: e.currentTarget.getAttribute("seq") })
        .then(res => console.log(res))
        .catch(e => console.log(e));
      setAlertList(alertList.filter(v => v.alert_seq != e.currentTarget.getAttribute("seq")))

    }
  }

  //로그인 시 알림 목록을 가져옴
  const [alertList, setAlertList] = useState([])
  useEffect(() => {
    localStorage.getItem("nick") !== null
      && axios
        .post('gigwork/alert/getList', { mem_nick: localStorage.getItem("nick") })
        .then(res => setAlertList(res.data))
        .catch(e => console.log(e));
    setAlarm(false)
  }, [useLocation()])

  // 알림 메세지가 있을때와 없을때 이미지 변환
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  useEffect(() => {
    alertList.length === 0
      ? setIsAlarmOn(false)
      : setIsAlarmOn(true)
  }, [alertList])
  function Alarm(props) {
    return props.isAlarmOn
      ? <img className='alarmImg' src={alarmOn} onClick={toggleAlarm} />
      : <img className='alarmImg' src={alarmOff} onClick={toggleAlarm} />
  }

//알림 메세지 실시간으로 띄우기
socket.onmessage = function (event) {
  let message = JSON.parse(event.data);
  console.log(message);
  if (message.talker !== undefined) {
  let newAlert = {
    alert_cnt: message.msg, alert_seq: 0,
    alert_time: message.msg_time, ckecking: 't', mem_nick: message.sendto,
    sendfrom: message.talker
  }
    setAlertList(alertList.concat(newAlert))
    axios
      .post('gigwork/alert/addChatAlert', newAlert)
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }
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
            <Toast show={alarm} animation={false} key={item.alert_seq}>
              <Toast.Header onClick={toastHeaderClick} seq={item.alert_seq}>
                <img style={{ height: '20px' }} src={chat} className="rounded me-2" alt="" />
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