import React, { useEffect, useState } from 'react'
import '../css/JOlist.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Offcanvas from 'react-bootstrap/Offcanvas';
import sidepic from '../asset/imgJY/play.png'





const JOlist = () => {






    const [receiveList, setReceiveList] = useState([])


    useEffect(() => {
        axios
            .post('/gigwork/post/postlist')
            .then((res) => {
                setReceiveList(res.data)
                console.log(res.data)
                    .catch(error => console.log(error))
            })
    }, [])







    const job = ['청소/집안일', '동행/돌봄', '벌레/쥐잡기', '배달/장보기', '설치/조립', '팻케어', '대리/카풀', '과외수업', '역할대행', '기타']
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [urgent, setUrgent] = useState(false)
    const handleCheckUrgent = (e) => { setUrgent(e.target.checked); console.log(e.target.checked) }
    const [startDate, setStartDate] = useState('');
    const handleStartDate = (e) => { setStartDate(e.target.value); console.log(e.target.value) }
    const [endDate, setEndDate] = useState('');
    const handleEndDate = (e) => { setEndDate(e.target.value); console.log(e.target.value) }
    const [jobCategory, setJobCategory] = useState('')
    const handleJobCategory = (e) => { setJobCategory(e.target.value); console.log(e.target.value) }
    const [offer, setOffer] = useState(false)
    const handleOffer = (e) => { setOffer(e.target.checked); console.log(e.target.checked) }
    const [pay, setPay] = useState(0)
    const handlePay = (e) => { setPay(e.target.value); console.log(e.target.value) }


    //필터 정보를 저장할 변수
    const [printdata, setPrintdata] = useState('')

    const Ckfilterbtn = () => {
        setPrintdata(receiveList.filter(v => ((v.post_cate === jobCategory) && (v.post_pay <= pay))))
        console.log("출력된 값", printdata)
    }






    return (
        <div className='topdivB'>

            <div className='sidebar'>
                <img src={sidepic} onClick={handleShow} id='sidepic'></img>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className='filter'>

                            <h3 id='wantedperiod'>희망 기간</h3>
                            <input type='checkbox' id='checkpart' onChange={handleCheckUrgent} value={urgent} />급구만 보기<br />

                            <div className='period'>
                                <input type='datetime-local' value={startDate} onChange={handleStartDate} />{"\u00A0"}부터{"\u00A0"}<br /><input type='datetime-local' value={endDate} onChange={handleEndDate} />{"\u00A0"}까지{"\u00A0"}</div>

                            <div className='wantedjob'>
                                <h3>희망 직무</h3>
                                <select id='wantedcategory' value={jobCategory} onChange={handleJobCategory}><option value="defualt">직무 선택</option>
                                    {job && job.map((item, idx) => <option key={item + idx}>{item}</option>)}</select></div>

                            <div className='wantedprice'>
                                <h3>희망 수당</h3>
                                <input type='checkbox' id='checkpart' onChange={handleOffer} value={offer} />제의받음만 보기<br />
                                <input type='number' id='pricenum' min='1000' value={pay} onChange={handlePay}></input>
                            </div>

                            <div className='sidebarbtn'>
                                <button id='filterbtn' onClick={Ckfilterbtn}>필터적용</button>
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas></div>



            <div className='previewlist'>
                <div className="listalignbox">
                    <div className='secondtopdiv'>
                        <span id='dong'>내주변 검색결과</span>
                        <select id='category_listmain'>
                            <option value="default" >정렬 기준</option>
                            <option>최다 거래순</option>
                            <option>인기순</option>
                            <option>오래된 순서순</option>
                        </select>
                    </div>
                    <div className='boxes'>
                        <Container>
                            <Row className='Row'>
                                {receiveList && receiveList.map((item, idx) =>
                                    <Col md={6} xs={12} >
                                        <div id='box' key={item + idx}>
                                            {item.post_cate}<br />{item.title}<br />{item.post_pay}<br />{item.urgent}
                                        </div>
                                    </Col>)}
                            </Row>
                        </Container>

                    </div>
                    <div className='moreviewbtn'>
                        <button id='morebtn'>더보기</button>
                    </div>

                    <br />
                </div>
            </div>
        </div>
    )
}

export default JOlist