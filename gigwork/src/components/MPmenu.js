import '../css/SJ.css'
import React from 'react'
import { Link } from 'react-router-dom'
import arrow from '../asset/imgSJ/화살표.png'

const MPmenu = () => {

    let menu =["프로필 관리","내 의뢰글 관리","최근 본 공고 / 찜 목록"]
    let resMenu = menu.map((item)=><div><Link to="/" className='menuBtn' key={item}>{item}</Link></div>)

    // 반응형 할때 사용
    // const menuSize=()=>{
    //     if(window.innerWidth<"1000"){
    //         document.querySelector(".menu").classList.add('menuNone')
    //         document.querySelector("img").classList.remove('menuNone')
    //     }else {
    //         document.querySelector(".menu").classList.remove('menuNone')
    //         document.querySelector("img").classList.add('menuNone')
    //     }
    // } 
    // window.addEventListener("resize", menuSize);
    // menuSize()

    return (
        <div>
            
            <div className='SJmenu'>
            <div><Link to="/MPprivacy" className='menuBtn'>개인정보 관리</Link></div>
            {resMenu}
            <div><Link to="/PFlist" className='menuBtn'>리스트로이동</Link></div>
            </div>
            <img src={arrow} className='menuNone menuArrow'></img>
        </div>
  )
}

export default MPmenu

