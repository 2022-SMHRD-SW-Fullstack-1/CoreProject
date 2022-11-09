import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
import etc from '../asset/img/etc.png'
import install from '../asset/img/mainCategory_install.png'
import delivery from '../asset/img/mainCategory_delivery.png'
import '../css/Main.css'

const Main = () => {

    const navigate = useNavigate()

    const [myloc, setMyLoc] = useState({lat: 35.14987499845749, lng: 126.91981851928963})
    const [makerloc, setMakerLoc] = useState(myloc)
    const [urgetPost, setUrgetPost] = useState([{title: "바선생 출몰!!@! 잡아주실 분 구해요 ㅠ",
                                                pay: 5000,
                                                payoffer: true,
                                                lat: 35.14979419266745,
                                                lng: 126.91694331749281},
                                                {title: "택시가 안잡혀요 ㅠㅠ 문화전당역 쪽에서 첨단까지 가시는 카풀 가능하신 분?",
                                                pay: 15000,
                                                payoffer: false,
                                                lat: 35.146633960926714,
                                                lng: 126.91885050539693},
                                                {title: "컴퓨터 조립 하실 줄 아시는 분??",
                                                pay: 20000,
                                                payoffer: true,
                                                lat: 35.14792725339202,
                                                lng: 126.93336796277288},
                                                {title: "바선생 출몰!!@! 잡아주실 분 구해요 ㅠ",
                                                pay: 5000,
                                                payoffer: true,
                                                lat: 35.14979419266745,
                                                lng: 126.91694331749281},
                                                {title: "택시가 안잡혀요 ㅠㅠ 문화전당역 쪽에서 첨단까지 가시는 카풀 가능하신 분?",
                                                pay: 15000,
                                                payoffer: false,
                                                lat: 35.146633960926714,
                                                lng: 126.91885050539693},
                                                {title: "컴퓨터 조립 하실 줄 아시는 분??",
                                                pay: 20000,
                                                payoffer: true,
                                                lat: 35.14792725339202,
                                                lng: 126.93336796277288}])

    const placeMarker = (e) => {
        setMakerLoc({lat: e.currentTarget.getAttribute('lat'),
                    lng: e.currentTarget.getAttribute('lng')})
    }



    const url = useLocation()
    const [topDivClass, setTopDivClass] = useState('')
    const [btnId, setBtnId] = useState('')
    const [brTag, setbrTag] = useState(<></>)
    const handleResize = () => {
        window.innerWidth>900
        ?setTopDivClass('top_div_width')
        :setTopDivClass('')
        window.innerWidth>900
        ?setBtnId('btnImgP')
        :setBtnId('')
        window.innerWidth>900
        ?setBtnId(<></>)
        :setBtnId(<><br/><br/></>)
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

    // 페이지 이동
    const goToJOlist = (e) => {
        e.currentTarget.getAttribute('category') === null
        ?navigate('/JOlist')
        :navigate('/JOlist?category='+e.currentTarget.getAttribute('category'))
    }
    const goToJOcreate = () => {
        localStorage.getItem('nick') === null
        ?navigate('/login')
        :navigate('/JOcreate')
    }
    const goToPFlist = () => {
        navigate('/PFlist')
    }
    
    const job = ['청소/집안일', '동행/돌봄', '벌레/쥐잡기', '배달/장보기', '설치/조립', '팻케어', '대리/카풀', '과외수업', '역할대행', '기타']
    

    return (
        <div className='top_div'>
            <div className={topDivClass} id='main'>
            <div className='category' onMouseOver={() => { setBtnToggle(true) }}>
                <div className='categoryRow'>
                    <div category={'청소/집안일'} onClick={goToJOlist} className='categoryBox'><img src={clean}/><span>청소, 집안일</span></div>
                    <div category={'동행/돌봄'} onClick={goToJOlist} className='categoryBox'><img src={care}/><span>동행, 돌봄</span></div>
                    <div category={'벌레/쥐잡기'} onClick={goToJOlist} className='categoryBox'><img src={bug}/><span>벌레, 쥐잡기</span></div>
                    <div category={'배달/장보기'} onClick={goToJOlist} className='categoryBox'><img src={delivery}/><span>배달, 장보기</span></div>
                    <div category={'설치/조립'} onClick={goToJOlist} className='categoryBox'><img src={install}/><span>설치, 조립</span></div>
                </div>
                <div className='categoryRow'>
                    <div category={'팻케어'} onClick={goToJOlist} className='categoryBox'><img src={stroll}/><span>펫 케어</span></div>
                    <div category={'대리/카풀'} onClick={goToJOlist} className='categoryBox'><img src={drive}/><span>대리, 카풀</span></div>
                    <div category={'과외수업'} onClick={goToJOlist} className='categoryBox'><img src={teach}/><span>과외 수업</span></div>
                    <div category={'역할대행'} onClick={goToJOlist} className='categoryBox'><img src={lineUp}/><span>역할 대행</span></div>
                    <div onClick={goToJOlist} className='categoryBox'><img src={etc}/><span>기타 등등</span></div>
                </div>
            </div>
            <div className='buttonBox' id={btnId}>
                <button className='buttonHelp' id={btnToggle ? 'showBtn' : 'hideBtn'} onClick={changeBtn}><img src={help} /><div><p>도움 요청하기</p></div></button>
                <button onClick={goToJOcreate} className='buttonNote' id={btnToggle ? 'hideBtn' : 'showBtn'}><img src={note} /><div><p>의뢰글</p><p>작성하기</p></div></button>
                <button onClick={goToPFlist} className='buttonMagnif' id={btnToggle ? 'hideBtn' : 'showBtn'}><img src={magnif} /><div><p>해결사</p><p>찾아보기</p></div></button>
                <button onClick={goToJOlist} className='buttonSolver'><img src={solver} /><div><p>해결사</p><p>지원하기</p></div></button>
            </div>
            <div className='hurry'>
                <div className='hurryTitle'>
                    <h2>급구!</h2>
                    <span>더보기</span>
                </div>
                <div className='realTimePost' onMouseOver={() => { setBtnToggle(true) }}>
                    <div className='postListBox'>
                        {urgetPost.map((item,idx)=>(<div key={idx+item.title} onMouseOver={placeMarker} lat={item.lat} lng={item.lng} >
                                                        <span>{item.title}</span>
                                                        {brTag}
                                                        <button className={item.payoffer?'payOfferT':'payOfferF'}>제의받음</button>
                                                        <span>{item.pay}원</span>
                                                    </div>))}
                    </div>
                    <MapContainer myloc={myloc} makerloc={makerloc}/>
                </div>
            </div>
            <div className='todayPost'></div>
            </div>
        </div>
    )
}

export default Main