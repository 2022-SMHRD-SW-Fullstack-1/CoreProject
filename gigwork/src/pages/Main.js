import React from 'react'
import help from '../asset/img/help.png'
import solver from '../asset/img/solver.png'

const Main = () => {
  return (
    <div className='top_div' id='main'>
        <div className='blankForHeader'/>
        <div className='category'>
            <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div className='buttonBox'>
            <button className='buttonHelp'><img src={help}/><div><p>도움 요청하기</p></div></button>
            <button className='buttonSolver'><img src={solver}/><div><p>해결사</p><p>지원하기</p></div></button>
        </div>
        <div className='hurry'>
            <div className='hurryTitle'>
                <h2>급구!</h2>
                <span>더보기</span>
            </div>
            <div className='realTimePost'>
                <div></div>
                <div>map</div>
            </div>
        </div>
        <div className='todayPost'></div>
    </div>
  )
}

export default Main