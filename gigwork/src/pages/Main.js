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
import axios from 'axios'

const Main = () => {

    const navigate = useNavigate()

    //메인 페이지에 접속하면 현재 위치를 가져온다
    const [myloc, setMyLoc] = useState({lat: 35.1469568, lng:126.9202944})
    const [makerloc, setMakerLoc] = useState(myloc)
    const [urgetPost, setUrgetPost] = useState([])
    console.log(myloc)
    useEffect(()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                myloc.lat = (position.coords.latitude)
                myloc.lng = (position.coords.longitude)
                setMyLoc(myloc)
                setMakerLoc(myloc)
            }, function (error) {
                console.error(error);
            }, {
                enableHighAccuracy: false,
                maximumAge: 0,
                timeout: Infinity
            });
        } else {
            alert('GPS를 지원하지 않습니다')
        }
        axios
        .post('gigwork/post/getMainPost')
        .then(res => setUrgetPost(res.data))
        .catch(e => console.log(e));
    },[])

    const placeMarker = (e) => {
        setMakerLoc({
            lat: e.currentTarget.getAttribute('lat'),
            lng: e.currentTarget.getAttribute('lng')
        })
    }

    const url = useLocation()
    const [topDivClass, setTopDivClass] = useState('')
    const [btnId, setBtnId] = useState('')
    const [brTag, setbrTag] = useState(<></>)

    // 창크기에따른 사이트 조절
    const handleResize = () => {
        window.innerWidth > 900
            ? setTopDivClass('top_div_width')
            : setTopDivClass('')
        window.innerWidth > 900
            ? setBtnId('btnImgP')
            : setBtnId('')
        window.innerWidth > 900
            ? setBtnId(<></>)
            : setBtnId(<><br /><br /></>)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);
    useEffect(() => {
        handleResize()
    }, [url])

    //
    const [btnToggle, setBtnToggle] = useState(true)
    const changeBtn = () => {
        setBtnToggle(!btnToggle)
    }

    // 페이지 이동
    const goToJOlist = (e) => {
        e.currentTarget.getAttribute('category') === null
            ? navigate('/JOlist')
            : navigate('/JOlist?category=' + e.currentTarget.getAttribute('category'))
    }
    const goToJOcreate = () => {
        localStorage.getItem('nick') === null
            ? navigate('/login')
            : navigate('/JOcreate')
    }
    const goToPFlist = () => {
        navigate('/PFlist')
    }
    const goToDetail=(e)=>{
        const post_num = e.currentTarget.getAttribute("post_num")
        navigate(encodeURI('/JOdetail?post_num='+post_num))
    }

    return (
        <div className='top_div'>
            <div className={topDivClass} id='main'>
                <div className='category' onMouseOver={() => { setBtnToggle(true) }}>
                    <div className='categoryRow'>
                        <div category={'청소/집안일'} onClick={goToJOlist} className='categoryBox'><img src={clean} /><span>청소, 집안일</span></div>
                        <div category={'동행/돌봄'} onClick={goToJOlist} className='categoryBox'><img src={care} /><span>동행, 돌봄</span></div>
                        <div category={'벌레/쥐잡기'} onClick={goToJOlist} className='categoryBox'><img src={bug} /><span>벌레, 쥐잡기</span></div>
                        <div category={'배달/장보기'} onClick={goToJOlist} className='categoryBox'><img src={delivery} /><span>배달, 장보기</span></div>
                        <div category={'설치/조립'} onClick={goToJOlist} className='categoryBox'><img src={install} /><span>설치, 조립</span></div>
                    </div>
                    <div className='categoryRow'>
                        <div category={'팻케어'} onClick={goToJOlist} className='categoryBox'><img src={stroll} /><span>펫 케어</span></div>
                        <div category={'대리/카풀'} onClick={goToJOlist} className='categoryBox'><img src={drive} /><span>대리, 카풀</span></div>
                        <div category={'과외수업'} onClick={goToJOlist} className='categoryBox'><img src={teach} /><span>과외 수업</span></div>
                        <div category={'역할대행'} onClick={goToJOlist} className='categoryBox'><img src={lineUp} /><span>역할 대행</span></div>
                        <div onClick={goToJOlist} className='categoryBox'><img src={etc} /><span>기타 등등</span></div>
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
                            {urgetPost.map((item, idx) => (<div post_num={item.post_num} onClick={goToDetail} key={idx + item.title} onMouseOver={placeMarker} lat={item.lat} lng={item.lng} >
                                <span>{item.title}</span>
                                {brTag}
                                <button className={item.post_offer_yn === 'offerY.png' ? 'payOfferT' : 'payOfferF'}>제의받음</button>
                                <span>{item.post_pay}원</span>
                            </div>))}
                        </div>
                        <MapContainer myloc={myloc} makerloc={makerloc} />
                    </div>
                </div>
                <div className='todayPost'></div>
            </div>
        </div>
    )
}

export default Main