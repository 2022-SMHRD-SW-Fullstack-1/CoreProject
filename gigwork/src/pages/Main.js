import React, { useState } from 'react'
import help from '../asset/img/help.png'
import solver from '../asset/img/solver.png'
import magnif from '../asset/img/magnifGlass.png'
import note from '../asset/img/note.png'
import '../css/Main.css'

const Main = () => {

    const [btnToggle, setBtnToggle] = useState(true)
    const changeBtn = () => {
        setBtnToggle(!btnToggle)
    }


  return (
    <div className='top_div' id='main'>
        <div className='blankForHeader'/>
        <div className='category' onMouseOver={() => {setBtnToggle(true)}}>
            <div className='categoryRow'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className='categoryRow'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div className='buttonBox'>
            <button className='buttonHelp' id={btnToggle?'showBtn':'hideBtn'} onClick={changeBtn}><img src={help}/><div><p>도움 요청하기</p></div></button>
            <button className='buttonNote' id={btnToggle?'hideBtn':'showBtn'}><img src={note}/><div><p>의뢰글</p><p>작성하기</p></div></button>
            <button className='buttonMagnif' id={btnToggle?'hideBtn':'showBtn'}><img src={magnif}/><div><p>해결사</p><p>찾아보기</p></div></button>
            <button className='buttonSolver'><img src={solver}/><div><p>해결사</p><p>지원하기</p></div></button>
        </div>
        <div className='hurry'>
            <div className='hurryTitle'>
                <h2>급구!</h2>
                <span>더보기</span>
            </div>
            <div className='realTimePost' onMouseOver={() => {setBtnToggle(true)}}>
                <div></div>
                <div>map</div>
            </div>
        </div>
        <div className='todayPost'></div>
    </div>
  )
}

export default Main