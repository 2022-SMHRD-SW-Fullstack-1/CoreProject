import '../css/SJ.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import pfimg from '../asset/imgSJ/검정색사람.png';
import { Link, useNavigate } from 'react-router-dom';

import PFmyview from './PFmyview';
import PFotherview from './PFotherview';


const PFlist = () => {

    
    const navigate = useNavigate()
    const goToProfile = (e) =>{
        const name = e.target.getAttribute("name")
        navigate(encodeURI('/PFotherview?name='+name))
    }




    const[message, setMessage] = useState("");

    useEffect(() => {        
        axios
        .get('/gigwork/hello')            
        .then(res => setMessage(res.data))            
        .catch(e=> console.log(e));    
    },[])

    console.log(message);

    let category = ["청소/집안일", "동행/돌봄", "벌레/쥐잡기", "배달/장보기", "설치/조립", "펫 케어", "대리/카풀", "과외 수업", "역할 대행"]

    let sido = ["서울특별시", "인천광역시", "대전광역시", "광주광역시", "대구광역시", "울산광역시", "부산광역시", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주도"];

    let area0 = ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"];
    let area1 = ["계양구", "남구", "남동구", "동구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군"];
    let area2 = ["대덕구", "동구", "서구", "유성구", "중구"];
    let area3 = ["광산구", "남구", "동구", "북구", "서구"];
    let area4 = ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"];
    let area5 = ["남구", "동구", "북구", "중구", "울주군"];
    let area6 = ["강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구", "기장군"];
    let area7 = ["고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시", "가평군", "양평군", "여주군", "연천군"];
    let area8 = ["강릉시", "동해시", "삼척시", "속초시", "원주시", "춘천시", "태백시", "고성군", "양구군", "양양군", "영월군", "인제군", "정선군", "철원군", "평창군", "홍천군", "화천군", "횡성군"];
    let area9 = ["제천시", "청주시", "충주시", "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "증평군", "진천군", "청원군"];
    let area10 = ["계룡시", "공주시", "논산시", "보령시", "서산시", "아산시", "천안시", "금산군", "당진군", "부여군", "서천군", "연기군", "예산군", "청양군", "태안군", "홍성군"];
    let area11 = ["군산시", "김제시", "남원시", "익산시", "전주시", "정읍시", "고창군", "무주군", "부안군", "순창군", "완주군", "임실군", "장수군", "진안군"];
    let area12 = ["광양시", "나주시", "목포시", "순천시", "여수시", "강진군", "고흥군", "곡성군", "구례군", "담양군", "무안군", "보성군", "신안군", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"];
    let area13 = ["경산시", "경주시", "구미시", "김천시", "문경시", "상주시", "안동시", "영주시", "영천시", "포항시", "고령군", "군위군", "봉화군", "성주군", "영덕군", "영양군", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군"];
    let area14 = ["거제시", "김해시", "마산시", "밀양시", "사천시", "양산시", "진주시", "진해시", "창원시", "통영시", "거창군", "고성군", "남해군", "산청군", "의령군", "창녕군", "하동군", "함안군", "함양군", "합천군"];
    let area15 = ["서귀포시", "제주시", "남제주군", "북제주군"];

    let resCate = category.map((item) => <option key={item}>{item}</option>)


    const [selArea, setSelArea] = useState(area0);
    const [whatSido, setWhatSido] = useState("서울특별시");
    const [whatGungu, setWhatGungu] = useState("강남구")
    const [whatCate, setWhatCate] = useState("동행/돌봄")

    let resSido = sido.map(item => (<option key={item}>{item}</option>))

    let resGungu = selArea.map((item) => <option key={item}>{item}</option>)

    // 시/도 선택 시 change함수
    const sidoChange = (e) => {
        const { value } = e.target
        setWhatSido(value)
        if (value == "서울특별시") {
            setSelArea(area0)
            setWhatSido("서울")
        } else if (value == "인천광역시") {
            setSelArea(area1)
            setWhatSido("인천")
        } else if (value == "대전광역시") {
            setSelArea(area2)
            setWhatSido("대전")
        } else if (value == "광주광역시") {
            setSelArea(area3)
            setWhatSido("광주")
        } else if (value == "대구광역시") {
            setSelArea(area4)
            setWhatSido("대구")
        } else if (value == "울산광역시") {
            setSelArea(area5)
            setWhatSido("울산")
        } else if (value == "부산광역시") {
            setSelArea(area6)
            setWhatSido("부산")
        } else if (value == "경기도") {
            setSelArea(area7)
        } else if (value == "강원도") {
            setSelArea(area8)
        } else if (value == "충청북도") {
            setSelArea(area9)
        } else if (value == "충청남도") {
            setSelArea(area10)
        } else if (value == "전라북도") {
            setSelArea(area11)
        } else if (value == "전라남도") {
            setSelArea(area12)
        } else if (value == "경상북도") {
            setSelArea(area13)
        } else if (value == "경상남도") {
            setSelArea(area14)
        } else if (value == "제주도") {
            setSelArea(area15)
        }
    }

    // 카테고리 정보 받기
    const cateChange = (e) => {
        const { value } = e.target
        setWhatCate(value)

    }

    // 군/구 정보 받기
    const gunguChange = (e) => {
        const { value } = e.target
        setWhatGungu(value)
    }

    //  성별 정보 받기
    const [whatGender, setWhatGender] = useState("N");
    const genderChange = (e) => {
        const { value } = e.target
        setWhatGender(value)
    }

    // 나이 정보 받기
    const [whatMinAge, setWhatMinAge] = useState(0)
    const [whatMaxAge, setWhatMaxAge] = useState(100)
    const minAgeChange = (e) => {
        const { value } = e.target
        setWhatMinAge(Number(value))
    }
    const maxAgeChange = (e) => {
        const { value } = e.target
        setWhatMaxAge(Number(value))
    }

    const [whatAnyAge, setWhatAnyAge] = useState("Y")
    const anyAge = () => {
        if (whatAnyAge == "N") {
            setWhatAnyAge("Y")
        } else {
            setWhatAnyAge("N")
        }
    }

    // 선택사항 선택 후 정보 저장
    const choiceDone = () => {
        setPointPfs(pfs.filter(v => (v.age <= whatMaxAge && v.age >= whatMinAge || "N" == whatAnyAge) 
        && (v.gender == whatGender || "N" == whatGender)&&(v.sido == whatSido)&&(v.gungu == whatGungu)
        &&(v.cate_one == whatCate || v.cate_two == whatCate || v.cate_three == whatCate)))
    }

    let [pfs,setPfs] = useState([])


    useEffect(()=>{
        axios
        .post('gigwork/profile/prolist')
        .then(res=>setPfs(res.data.JsonArray))
        .catch(e=>console.log(e));
    },[])




    const [pointPfs, setPointPfs] = useState(pfs.filter(v => v.age < 100 && v.age > 0))

    // 각 카드 map
    // let resPfs = pointPfs.map((item, idx) =>
    //     <Card style={{ width: '18rem' }} key={item+idx} className="pfCard">
    //         <Card.Img variant="top" src={item.imgsrc} style={{ width: '6rem' }} />
    //         <Card.Body>
    //             <Card.Title>{item.name}( {item.gender} / {item.age}세 )</Card.Title>
    //             <Card.Text>
    //                 {item.say}
    //             </Card.Text>
    //             <Link to='/PFotherview' id='savePF'>프로필 자세히</Link>
    //         </Card.Body>
    //     </Card>
    // )

    let resPfs1 = pointPfs.map((item, idx) =>
    <div className='pfCard' key={item+idx}>
            <div className='pfCardHead'>
                <div><img src={item.imgsrc} style={{ width: '6rem' }}></img></div>
                <div className='pfNameGen'>
                <div>{item.name}</div>
                <div>{item.gender} / {item.age}세</div>
                </div>
            </div>
            <div className='pfCardBody'>{item.say}</div>
            <div><span id="savePF" onClick={goToProfile} name={item.name}>프로필 자세히</span></div>
        </div>)

    // 더보기 버튼 구현


    return (
        <div className='top_div'>
            <div className='listDiv'>

                <div className='selLocDiv'>

                    <div className='cateTwinDiv'>
                        <div className='selDivTop'>
                            <div className='selTopSm'><p className='headP'>카테고리</p></div>
                            <div className='selTopSm'><p className='headP'>지역 선택</p></div>
                        </div>
                        <div className='selDivBot'>
                            <div className='selBotSm'><select onChange={cateChange}>{resCate}</select></div>
                            <div className='selBotSm'>
                                <select onChange={sidoChange}>
                                    {resSido}
                                </select>
                                <select onChange={gunguChange}>
                                    {resGungu}
                                </select></div>
                        </div>
                    </div>
                    
                    <div className='cateTwinDiv'>
                        <div className='selDivTop'>
                            <div className='selTopSm'><p className='headP'>성 별</p></div>
                            <div className='selTopSm'><p className='headP'>연 령</p></div>
                        </div>
                        <div className='selDivBot'>
                            <div className='selBotSm' onChange={genderChange}>
                                <p>무관<input type="radio" name='gender' value="N"></input></p>
                                    <p>여자<input type="radio" name='gender' value="여" ></input></p>
                                    <p>남자<input type="radio" name='gender' value="남"></input></p></div>
                            <div className='selBotSm'>
                                <p>무관<input type="checkbox" name='age' onClick={anyAge}></input></p>
                                <p><input type="number" name='minAge' min='0' onChange={minAgeChange}></input></p>
                                <p>~<input type="number" name='maxAge' min='0' onChange={maxAgeChange}></input></p></div>
                        </div>
                    </div>

                </div>
{/*  */}

                <div id="choiceDiv">
                    <span onClick={choiceDone} id="cateChoBtn">선택</span>
                </div>
                <div className='selListDiv'>

                <div className='pfList'>
                    {resPfs1}
                </div>
                </div>
            </div>

        </div>
    )
}

export default PFlist