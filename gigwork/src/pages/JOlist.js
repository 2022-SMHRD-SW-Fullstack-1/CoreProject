import React, { useEffect, useState } from 'react'
import '../css/JOlist.css';
import axios from 'axios';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';




const JOlist = () => {

    //post_num 받고 proDetail에 저장하기
    var str = decodeURI(window.location.search);
    const params = new URLSearchParams(str);


    
    const navigate = useNavigate()
    const goToDetail=(e)=>{
        const post_num = e.target.getAttribute("name")
        navigate(encodeURI('/JOdetail?post_num='+post_num))
    }


    const date = new Date;


    const [receiveList, setReceiveList] = useState([{}])


    useEffect(() => {
        axios
            .post('/gigwork/post/postlist')
            .then((res) => {
                setReceiveList(res.data.JasonArray)
                console.log(res.data.JasonArray)
            })
            .catch(error => console.log(error))
    }, [])

    


    const job = ['청소/집안일', '동행/돌봄', '벌레/쥐잡기', '배달/장보기', '설치/조립', '팻케어', '대리/카풀', '과외수업', '역할대행', '기타']
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [urgent, setUrgent] = useState('N')
    const handleCheckUrgent = (e) => { 
        if (urgent === 'urgentN.png' || urgent === 'N') {
            setUrgent('urgentY.png')
        } else {
            setUrgent('urgentN.png')
         
        } 
       
    }

    const [startDate, setStartDate] = useState('');
    const handleStartDate = (e) => { setStartDate(e.target.value) }
    const [endDate, setEndDate] = useState('');
    const handleEndDate = (e) => { setEndDate(e.target.value) }
    const [jobCategory, setJobCategory] = useState('')
    const handleJobCategory = (e) => { setJobCategory(e.target.value) }
    const [offer, setOffer] = useState('N')
    const handleOffer = (e) => {
        if (offer == 'offerN.png' ||offer == 'N') {
            setOffer('offerY.png')            
          } else if (offer === 'offerY.png') {
            setOffer('offerN.png')          
          }           
        }
    const [pay, setPay] = useState(0)
    const handlePay = (e) => { setPay(e.target.value) }


    //필터 정보를 저장할 변수
    useEffect(()=>{
        setPrintdata(receiveList)
    },[receiveList])
    
    const Ckfilterbtn = () => {
        // setPrintdata(receiveList.filter(v =>(v.post_cate==jobCategory)&&(urgent=="N"||v.urgent==urgent)&&(new Date(v.worktime_s)<=startDate)&&(new Date(v.worktime_e)>=endDate)&&(offer=='N'||offer==v.post_offer_yn)&&(v.post_pay>=pay)))
        setPrintdata(receiveList.filter(v =>(v.post_cate==jobCategory||jobCategory==''||jobCategory=='default')
        &&(v.post_pay>=pay)&&(v.worktime_s>=startDate||startDate=='')
        &&(v.worktime_e<=endDate||endDate=='')&&(urgent=="N"||v.urgent==urgent)
        &&(offer=='N'||offer==v.post_offer_yn)))
        setJobCategory('')
        setPay(0)
        setStartDate('')
        setEndDate('')
        setUrgent('N')
        setOffer('N')
        handleClose();
    }
    
    const [printdata, setPrintdata] = useState(receiveList.filter(v=>(v.post_pay>=0)))



const resReceiveList = printdata.map((item,idx)=>{
if(((date - new Date(item.reg_date))/1000/60/60/24)>=1){
    

    if(Math.floor(Math.sqrt(
        (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
    *
    (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
    +
    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
    *
    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
    ))>1000){       
        return <div key={item+idx} className='joCardContainer' onClick={goToDetail} name={item.post_num}>
    <div name={item.post_num} className='joCardItem1'><img className='urgentMark' src={item.urgent}></img><img src={item.post_offer_yn} className='offerMark'></img><span/><span/><span/><span/>{Math.floor((date - new Date(item.reg_date))/1000/60/60/24)+"일 전"}</div>
            <div className='joCardItem2'><img src={item.img_src} name={item.post_num}></img></div>
    <div name={item.post_num} className='joTitle'><h4 name={item.post_num}>{item.title}</h4></div>
    <div name={item.post_num} className='joContent'>{item.content}</div>
    <div name={item.post_num} className='joCardItem3'>{Math.floor((Math.sqrt(
                        (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
                    *
                    (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
                    +
                    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
                    *
                    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
                    ))/1000)+"km"}<span>{item.post_cate}</span><span>{item.post_pay}원</span></div>
</div> 
}else{
    return <div key={item+idx} className='joCardContainer' onClick={goToDetail} name={item.post_num}>
    <div name={item.post_num} className='joCardItem1'><img className='urgentMark' src={item.urgent}></img><img src={item.post_offer_yn} className='offerMark'></img><span/><span/><span/><span/>{Math.floor((date - new Date(item.reg_date))/1000/60/60/24)+"일 전"}</div>
            <div className='joCardItem2'><img src={item.img_src} name={item.post_num}></img></div>
    <div name={item.post_num} className='joTitle'><h4 name={item.post_num}>{item.title}</h4></div>
    <div name={item.post_num} className='joContent'>{item.content}</div>
    <div name={item.post_num} className='joCardItem3'><span  className='greenTextColor'>{Math.floor((Math.sqrt(
                        (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
                    *
                    (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
                    +
                    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
                    *
                    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
                    )))+"m"}</span><span>{item.post_cate}</span><span>{item.post_pay}원</span></div>
</div> 
}
}else if(((date - new Date(item.reg_date)-32400000)/1000/60/60)>=1){
    if(Math.floor(Math.sqrt(
        (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
    *
    (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
    +
    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
    *
    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
    ))>1000){       
        return <div key={item+idx} className='joCardContainer' onClick={goToDetail} name={item.post_num}>
    <div name={item.post_num} className='joCardItem1'><img className='urgentMark' src={item.urgent}></img><img src={item.post_offer_yn} className='offerMark'></img><span/><span/><span/><span/>{Math.floor((date - new Date(item.reg_date)-32400000)/1000/60/60)+"시간 전"}</div>
            <div className='joCardItem2'><img src={item.img_src} name={item.post_num}></img></div>
    <div name={item.post_num} className='joTitle'><h4 name={item.post_num}>{item.title}</h4></div>
    <div name={item.post_num} className='joContent'>{item.content}</div>
    <div name={item.post_num} className='joCardItem3'>{Math.floor((Math.sqrt(
                        (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
                    *
                    (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
                    +
                    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
                    *
                    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
                    ))/1000)+"km"}<span>{item.post_cate}</span><span>{item.post_pay}원</span></div>
</div> 
}else{
    return <div key={item+idx} className='joCardContainer' onClick={goToDetail} name={item.post_num}>
    <div name={item.post_num} className='joCardItem1'><img className='urgentMark' src={item.urgent}></img><img src={item.post_offer_yn} className='offerMark'></img><span/><span/><span/><span/>{Math.floor((date - new Date(item.reg_date)-32400000)/1000/60/60)+"시간 전"}</div>
            <div className='joCardItem2'><img src={item.img_src} name={item.post_num}></img></div>
    <div name={item.post_num} className='joTitle'><h4 name={item.post_num}>{item.title}</h4></div>
    <div name={item.post_num} className='joContent'>{item.content}</div>
    <div name={item.post_num} className='joCardItem3'><span  className='greenTextColor'>{Math.floor((Math.sqrt(
                        (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
                    *
                    (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
                    +
                    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
                    *
                    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
                    )))+"m"}</span><span>{item.post_cate}</span><span>{item.post_pay}원</span></div>
</div> 
}
// }else if(((date - new Date(item.reg_date)-32400000)/1000/60)>=1){
}else{
    if(Math.floor(Math.sqrt(
        (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
    *
    (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
    +
    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
    *
    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
    ))>1000){       
        return <div key={item+idx} className='joCardContainer' onClick={goToDetail} name={item.post_num}>
    <div name={item.post_num} className='joCardItem1'><img className='urgentMark' src={item.urgent}></img><img src={item.post_offer_yn} className='offerMark'></img><span/><span/><span/><span/><span className='greenTextColor'>{Math.floor((date - new Date(item.reg_date)-32400000)/1000/60)+"분 전"}</span></div>
            <div className='joCardItem2'><img src={item.img_src} name={item.post_num}></img></div>
    <div name={item.post_num} className='joTitle'><h4 name={item.post_num}>{item.title}</h4></div>
    <div name={item.post_num} className='joContent'>{item.content}</div>
    <div name={item.post_num} className='joCardItem3'>{Math.floor((Math.sqrt(
                        (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
                    *
                    (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
                    +
                    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
                    *
                    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
                    ))/1000)+"km"}<span>{item.post_cate}</span><span>{item.post_pay}원</span></div>
</div> 
}else{
    return <div key={item+idx} className='joCardContainer' onClick={goToDetail} name={item.post_num}>
    <div name={item.post_num}  className='joCardItem1'><img className='urgentMark' src={item.urgent}></img><img src={item.post_offer_yn} className='offerMark'></img><span/><span/><span/><span/><span className='greenTextColor'>{Math.floor((date - new Date(item.reg_date)-32400000)/1000/60)+"분 전"}</span></div>
            <div className='joCardItem2'><img src={item.img_src} name={item.post_num}></img></div>
    <div name={item.post_num} className='joTitle'><h4 name={item.post_num}>{item.title}</h4></div>
    <div name={item.post_num} className='joContent'>{item.content}</div>
    <div name={item.post_num} className='joCardItem3'><span  className='greenTextColor'>{Math.floor((Math.sqrt(
                        (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
                    *
                    (((item.lat)-window.localStorage.getItem('lat'))*111*1000)
                    +
                    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
                    *
                    (((item.lng)-window.localStorage.getItem('lng'))*111*1000)
                    )))+"m"}</span><span>{item.post_cate}</span><span>{item.post_pay}원</span></div>
</div> 
}
}

}
)








    return (
        <div className='top_div'>
            <div className='joListTopDiv'>
                <div className='joListFirstDiv'>
                    <img src='arrowRight.png' onClick={handleShow} id='sidePic'></img>
                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <div >

                                <h3 id='wantedperiod'>희망 기간</h3>
                                <input type='checkbox' id='checkpart' onChange={handleCheckUrgent} value={urgent} />급구만 보기<br />

                                <div >
                                    <input type='datetime-local' value={startDate} onChange={handleStartDate} />{"\u00A0"}부터{"\u00A0"}<br /><input type='datetime-local' value={endDate} onChange={handleEndDate} />{"\u00A0"}까지{"\u00A0"}</div>

                                <div >
                                    <h3>희망 직무</h3>
                                    <select id='wantedcategory' value={jobCategory} onChange={handleJobCategory}><option value="default">직무 선택</option>
                                        {job && job.map((item, idx) => <option key={item + idx}>{item}</option>)}</select></div>

                                <div>
                                    <h3>희망 수당</h3>
                                    <input type='checkbox' id='checkpart' onChange={handleOffer} value={offer} />제의받음만 보기<br />
                                    <input type='text' id='pricenum'  value={pay} onChange={handlePay}></input> 원 이상
                                </div>

                                <div className='listFilterContainer'>
                                    <button id='filterbtn' onClick={Ckfilterbtn}>필터적용 ▶▶</button><span></span>

                                </div>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
                <div className='joListSecondDiv'>
                    <div className='joCateDiv'>
                        <span id='dong'>내주변 검색결과</span> <span><select id='category_listmain'>
                            <option value="default" >정렬 기준</option>
                            <option>최다 거래순</option>
                            <option>인기순</option>
                            <option>오래된 순서순</option>
                        </select></span>
                    </div>
                    <div className='joListDiv'>{resReceiveList}</div>
                </div>

            </div>

        </div>
    )
}

export default JOlist