import React, { useState, useEffect } from 'react'
import MapContainer from '../components/MapContainer'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    const [topDivClass, setTopDivClass] = useState('')
    const handleResize = () => {
        window.innerWidth>900
        ?setTopDivClass('top_div_width')
        :setTopDivClass('')
    }
    useEffect(()=>{
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        }
      }, []);
    

    const [btnToggle, setBtnToggle] = useState(true)
    const changeBtn = () => {
        setBtnToggle(!btnToggle)
    }

    


    return (
        <div className='top_div'>
            <div className={topDivClass} id='main'>
            <div className='category' onMouseOver={() => { setBtnToggle(true) }}>
                <div className='categoryRow'>
                    <div><img src={clean}/></div>
                    <div><img src={care}/></div>
                    <div><img src={bug}/></div>
                    <div><img src={delivery}/></div>
                    <div><img src={install}/></div>
                </div>
                <div className='categoryRow'>
                    <div><img src={stroll}/></div>
                    <div><img src={workHome}/></div>
                    <div><img src={drive}/></div>
                    <div><img src={teach}/></div>
                    <div><img src={lineUp}/></div>
                </div>
            </div>
            <div className='buttonBox'>
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
                    <div className='postListBox'></div>
                    <MapContainer/>
                </div>
            </div>
            <div className='todayPost'></div>
            </div>
        </div>
    )
}

export default Main