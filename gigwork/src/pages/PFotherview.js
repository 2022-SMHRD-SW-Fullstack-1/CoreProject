import React from 'react'
import MPmenu from '../components/MPmenu';
import man from '../asset/imgSJ/검정색사람.png'
import { Link } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar';
import tri from '../asset/imgSJ/노란삼각형.png';
import up50 from '../asset/imgSJ/face50up.png';


const PFotherview = () => {
  return (
    <div className='top_div'>
        <MPmenu></MPmenu>
        <div className='pfMyView'>
            <div className="pfImgDiv">
                <img src={man} height="120px"></img>
                <h2>닉네임 : OOO님</h2>
            </div>
            <div className='pfCategory'>
                    <div >
                        <div className='faceImg'>
                            <span>신뢰도 {60}</span>
                            <img src={up50}></img>
                        </div>
                        <div className='triangle'>
                            <span>최초 신뢰도 50</span>
                            <img src={tri}></img>
                        </div>
                        <ProgressBar striped variant="warning" now={60} />
                    </div>
                    <br />
                    <div>
                        자신있는 업무
                    </div>
                    <br />
                    <div>
                        <span >#배달/장보기</span>
                        <span>#운반/운송</span>
                        <span>#설치/조립</span>
                    </div>
                </div>
            <div>
                <div>
                    하고싶은 말
                </div>
                <div>
                    <br/>
                    시켜만 주십쇼!!열심히 하겠습니다!!
                </div>
            </div>
            <br/>
            <div>
                활동 내역
                <div className='pfActive'>
                <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <br/>
            <div>
                받은 매너 평가
                <div className='pfActive'>
                <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className='pfSaveDiv'>
                <br/>
            <Link to='#' id='savePF'>채팅하기</Link>
            </div>

        </div>
    </div>
  )
}

export default PFotherview