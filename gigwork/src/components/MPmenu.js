import '../css/SJ.css'
import React from 'react'
import { Link } from 'react-router-dom'
import arrow from '../asset/imgSJ/화살표.png'

const MPmenu = () => {

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
                <div></div>
            <div><Link to="/MPprivacy" className='menuBtn'>아이디 관리</Link></div>
            <div><Link to="/PFmyview" className='menuBtn'>프로필 관리</Link></div>
            <div><Link to="/MyPost" className='menuBtn'>의뢰글 관리</Link></div>
            <div><Link to="/MyBookmark" className='menuBtn'>찜 목록</Link></div>
            </div>
            <img src={arrow} className='menuNone menuArrow'></img>
        </div>
  )
}

export default MPmenu

