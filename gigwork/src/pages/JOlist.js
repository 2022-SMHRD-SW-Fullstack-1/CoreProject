import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';
import starpic from '../asset/imgJY/bookmark.png'
import sidepic from '../asset/imgJY/play.png'
import '../css/JOlist.css'


const JOlist = () => {
    const [dong, setDong] = useState('광천동')
    const [bookMarkIcon, setbookMarkIcon] = useState(false);
    const list = [
        {
            category: '벌레잡기',
            title: '벌레잡아주실분ㅠ',
            price: '10000원'
        }, {
            category: '조립',
            title: '컴퓨터 조립 할 줄 아시는분??',
            price: '100000원'
        },
        {
            category: '벌레잡기',
            title: '벌레잡아주실분ㅠ',
            price: '10000원'
        }, {
            category: '조립',
            title: '컴퓨터 조립 할 줄 아시는분??',
            price: '100000원'
        }
        , {
            category: '조립',
            title: '컴퓨터 조립 할 줄 아시는분??',
            price: '100000원'
        }, {
            category: '조립',
            title: '컴퓨터 조립 할 줄 아시는분??',
            price: '100000원'
        }, {
            category: '조립',
            title: '컴퓨터 조립 할 줄 아시는분??',
            price: '100000원'
        }, {
            category: '조립',
            title: '컴퓨터 조립 할 줄 아시는분??',
            price: '100000원'
        }, {
            category: '조립',
            title: '컴퓨터 조립 할 줄 아시는분??',
            price: '100000원'
        }, {
            category: '조립',
            title: '컴퓨터 조립 할 줄 아시는분??',
            price: '100000원'
        }
    ]
    const job = [
        '배달장보기', '청소집안일', '설치조립운반', '동행돌봄', '벌레쥐잡기', '역할대행', '운전카풀', '기타원격'
    ]
    let resList = list.map((item, idx) => <Col md={6} xs={12} key={item + idx}><div id='box'>{item.category}<br />{item.title}<br />{item.price}<a href="#" id='bookmark'><img width='20px' src={starpic} ></img></a></div></Col>)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='topdivB'>
            <div className='sidebar'>
                <img src={sidepic} onClick={handleShow} id='sidepic'></img>
                {/* <Button variant="primary" onClick={handleShow} className='pressbtn'>이거누르세요</Button> */}
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className='filter'>
                            <div className='period'>
                                <h3>희망 기간</h3>
                                <input type='checkbox' />급구만 보기<br />
                                <input type='date' />{"\u00A0"}부터
                                {"\u00A0"}
                                {"\u00A0"}
                                <input type='date' />{"\u00A0"}까지
                                <input type='time' />{"\u00A0"}부터
                                {"\u00A0"}
                                {"\u00A0"}
                                <input type='time' />{"\u00A0"}까지
                            </div>
                            <div className='wantedjob'>
                                <h3>희망 직무</h3>
                                <select>
                                    <option value="" selected disabled hidden>직무 선택</option>
                                    {job && job.map((item, idx) => <option key={item + idx}>{item}</option>)}
                                </select>
                            </div>
                            <div className='wantedprice'>
                                <h3>희망 수당</h3>
                                <input type='checkbox' />제의받음만 보기<br />
                                <input type='number' />
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
            <div className='previewlist'>
                <div className="listalignbox">
                    <div className='secondtopdiv'>
                        <span id='dong'>{dong} 검색결과</span>
                        <select id='filterB'>
                            <option value="" selected disabled hidden>정렬 기준</option>
                            <option>최다 거래순</option>
                            <option>인기순</option>
                            <option>오래된 순서순</option>
                        </select>
                    </div>
                    <div className='boxes'>
                        <Container>
                            <Row className='Row'>
                                {resList}

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