import React from 'react'
import { Link } from 'react-router-dom'
import nolnyeon from '../img/nolnyeon.png'
import searchIcon from '../img/searchIcon.png'


const Header = () => {

  return (
    <div className='top_div' id='header'>
      <div className='desktopHeader'>
        <div className='leftSection'>
          <img id='logo' src={nolnyeon} />
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
        <div className='rightSection'>
          <button>로그인</button>
          <button>회원가입</button>
        </div>
      </div>
    </div>
  )
}

export default Header