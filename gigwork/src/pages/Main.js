import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import MapContainer from '../components/MapContainer'
import SearchPlace from '../components/SearchPlace'

import help from '../asset/img/help.png'
import solver from '../asset/img/solver.png'
import magnif from '../asset/img/magnifGlass.png'
import note from '../asset/img/note.png'
import clean from '../asset/img/mainCategory_cleaning.png'
import care from '../asset/img/mainCategory_care.png'
import bug from '../asset/img/mainCategory_bug.png'
import teach from '../asset/img/teach.png'
import lineUp from '../asset/img/lineUp.png'
import drive from '../asset/img/mainCategory_drive.png'
import stroll from '../asset/img/mainCategory_stroll.png'
import workHome from '../asset/img/mainCategory_workHome.png'
import install from '../asset/img/mainCategory_install.png'
import delivery from '../asset/img/mainCategory_delivery.png'
import '../css/Main.css'

const Main = () => {

    const url = useLocation()
    const [topDivClass, setTopDivClass] = useState('')
    const [btnId, setBtnId] = useState('')
    const handleResize = () => {
        window.innerWidth>900
        ?setTopDivClass('top_div_width')
        :setTopDivClass('')
        window.innerWidth>900
        ?setBtnId('btnImgP')
        :setBtnId('')
    }
    useEffect(()=>{
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        }
      }, []);
    
    useEffect(()=>{
        handleResize()
    },[url])

    const [btnToggle, setBtnToggle] = useState(true)
    const changeBtn = () => {
        setBtnToggle(!btnToggle)
    }

    


    return (
        <div className='top_div'>
            <div className={topDivClass} id='main'>
            <div className='category' onMouseOver={() => { setBtnToggle(true) }}>
                <div className='categoryRow'>
                    <div className='categoryBox'><img src={clean}/><span>청소, 집안일</span></div>
                    <div className='categoryBox'><img src={care}/><span>동행, 돌봄</span></div>
                    <div className='categoryBox'><img src={bug}/><span>벌레, 쥐잡기</span></div>
                    <div className='categoryBox'><img src={delivery}/><span>배달, 장보기</span></div>
                    <div className='categoryBox'><img src={install}/><span>설치, 조립</span></div>
                </div>
                <div className='categoryRow'>
                    <div className='categoryBox'><img src={stroll}/><span>펫 케어</span></div>
                    <div className='categoryBox'><img src={workHome}/><span>원격, 재택 근무</span></div>
                    <div className='categoryBox'><img src={drive}/><span>대리, 카풀</span></div>
                    <div className='categoryBox'><img src={teach}/><span>과외 수업</span></div>
                    <div className='categoryBox'><img src={lineUp}/><span>역할 대행</span></div>
                </div>
            </div>
            <div className='buttonBox' id={btnId}>
                <button className='buttonHelp' id={btnToggle ? 'showBtn' : 'hideBtn'} onClick={changeBtn}><img src={help} /><div><p>도움 요청하기</p></div></button>
                <button className='buttonNote' id={btnToggle ? 'hideBtn' : 'showBtn'}><img src={note} /><div><p>의뢰글</p><p>작성하기</p></div></button>
                <button className='buttonMagnif' id={btnToggle ? 'hideBtn' : 'showBtn'}><img src={magnif} /><div><p>해결사</p><p>찾아보기</p></div></button>
                <button className='buttonSolver'><img src={solver} /><div><p>해결사</p><p>지원하기</p></div></button>
            </div>
            <div className='hurry'>
                <div className='hurryTitle'>
                    <h2>급구!</h2>
                    <span>더보기</span>
                </div>
                <div className='realTimePost' onMouseOver={() => { setBtnToggle(true) }}>
                    <div className='postListBox'>
                        
                    </div>
                    <MapContainer/>
                </div>
            </div>
            <div className='todayPost'></div>
            </div>
        </div>
    )
}

export default Main