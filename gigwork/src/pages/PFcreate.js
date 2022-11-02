import '../css/SJ.css'
import React, { useEffect, useRef, useState } from 'react'
import { Await, Link } from 'react-router-dom'
import man from '../asset/imgSJ/검정색사람.png'
import MPmenu from '../components/MPmenu'
import axios, { Axios } from 'axios'


let choiceCate =[];

const PFcreate = () => {


    let testId = "tjdwns65";




let [cateOne,setCateOne] = useState('N');
let [cateTwo,setCateTwo] = useState('N');
let [cateThree,setCateThree] = useState('N');


    const clickBtn=(e)=>{
        if(e.target.className=="pfCategoryBox"){
            if(choiceCate.length!==3){
                e.target.classList.add('pfClickBtn')
            }
        }else{
            e.target.classList.remove('pfClickBtn')
        }

        if(choiceCate.includes(e.target.innerText)){
            for(let i =0; i<choiceCate.length;i++){
                if(choiceCate[i]==e.target.innerText){
                    choiceCate.splice(i,1);
                    i--;
                }
            }
        }else{
            if(choiceCate.length==3){
                alert("최대 3가지만 가능합니다")
            }else if(choiceCate.length==0){
                choiceCate.push(e.target.innerText)
                setCateOne(e.target.innerText)
            }else if(choiceCate.length==1){
                choiceCate.push(e.target.innerText)
                setCateTwo(e.target.innerText)
            }else if(choiceCate.length==2){
                choiceCate.push(e.target.innerText)
                setCateThree(e.target.innerText)
            }

        }
    }
// 희망근무지역 선택 div만들기
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

    const [selArea, setSelArea] = useState(area0);
    const [whatSido, setWhatSido] = useState("서울특별시");
    const [whatGungu, setWhatGungu] = useState("강남구")
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
        e.target.classList.add("selected")
    }
        // 군/구 정보 받기
        const gunguChange = (e) => {
            const { value } = e.target
            setWhatGungu(value)
            e.target.classList.add("selected")
        }
        let resSido = sido.map(item => (<option key={item}>{item}</option>))

        let resGungu = selArea.map((item) => <option key={item}>{item}</option>)
    

// 희망근무지역 선택 div만들기
let category =[
    "동행/돌봄","배달/장보기","동물/벌레퇴치",
    "설치/조립","청소/집안일","역할대행",
    "운반/운송","운전/대리/카풀","재택/부업"
]
let resCate = category.map((item)=>
<button className='pfCategoryBox' id='pfCateHover' onClick={clickBtn} key={item}>
    {item}</button>)



let [proCreInfo,setProCreInfo]=useState('')

let [sayInfo,setSayInfo]=useState('')
let [openInfo,setOpenInfo]=useState('')
let [closeInfo,setCloseInfo]=useState('')

const writeSay = (e)=>{
    setSayInfo(e.target.value)
    console.log(sayInfo)
}
const openDate=(e)=>{
        setOpenInfo(e.target.value)
        e.target.classList.add("selected")
}
const closeDate=(e)=>{
        setCloseInfo(e.target.value)
        e.target.classList.add("selected")
}

let [imgSrcInfo,setImgSrcInfo] = useState('N');


useEffect(()=>{
    setProCreInfo({id:testId,say:sayInfo,imgSrc:imgSrcInfo,cOne:cateOne,cTwo:cateTwo,cThree:cateThree,sido:whatSido,gungu:whatGungu,openDate:openInfo,closeDate:closeInfo})
},[cateOne,cateTwo,cateThree,sayInfo,openInfo,closeInfo,whatSido,whatGungu])

// useEffect(()=>{
//     setProCreInfo({testId,sayInfo,date:openInfo,closeInfo})
// },[sayInfo,openInfo,closeInfo])

// 10월 31일

const handleImg=(e)=>{
    console.log(e.target.value);
    console.log(e.target.files[0]);
}


// 10월 31일

// 11월 1일(내 위도경도 얻기)

const [lat,setLat]=useState(0)
const [lng,setLng]=useState(0)

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)

            axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`
            ,{headers:{Authorization:`KakaoAK 60d5d81294704ed44ae5c3954751b412`}}
                 )
             .then(res=>{
                console.log(res.data.documents)
                console.log(res.data.documents[0].address.region_1depth_name)
                console.log(res.data.documents[0].address.region_2depth_name)
                console.log(whatSido)
                console.log(whatGungu)
        }
        ).catch(e=>console.log(e))



            // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=f1ac598e1d9ac7ea30dd5a1a6cdaed78`
            // fetch(url)
            //     .then((response)=>response.json())
            //     .then((data)=>{
            //         console.log(data)
            //     })
            
        },function(error){
            console.error(error);
        },{
            enableHighAccuracy:false,
            maximumAge:0,
            timeout:Infinity
        });
    }else{
        alert('GPS를 지원하지 않습니다')
    }
}

getLocation()





// 백엔드에서 정보가져와 저장하기
// const [message, setMessage] = useState('');
// useEffect(()=>{
//     axios
//     .post('gigwork/profile/select')
//      .then(res=>setMessage(res.data))
//     .catch(e=>console.log(e));
// },[])





// 

// 11월 1일

const saveProfile=(e)=>{
    if(openInfo>closeInfo){
        alert("올바른 날짜를 입력해주세요")
        alert(choiceCate)
        e.preventDefault()
    }else{
        axios
        .post('/gigwork/profile/create', proCreInfo)
        .then(res=>console.log(res))
        .then(choiceCate=[])
        .catch(e=>console.log(e));
    }
}

  return (
    <div className='top_div'>
        <MPmenu></MPmenu>
        <div className='pfCreateDiv'>
            <div className="pfImgDiv">
                <img src={man} height="120px"/>
                <input type='file' onChange={handleImg}></input>


                <h2>닉네임 : 님</h2>
            </div>
            <div className='pfCategory'>
                <div>
                    <span>자신있는 업무 (최대 3가지)</span>
                </div>
                <div>
                {resCate}
                </div>
            </div>
            <div className='pfCategory'>
            <div>
                희망 근무 지역
                <div className='locationHope'>
                    <select onChange={sidoChange}>
                        {resSido}
                    </select>
                    <select onChange={gunguChange}>
                         {resGungu}
                    </select>
                </div>
            </div>
                <div>
                하고싶은 말
                </div>
                <textarea  id="say" rows="3" onChange={writeSay}></textarea>
                </div>
            
            <div className='pfDate'>
                <div>
                    <br/>
                공개기간
                </div>
                <input type="date" onChange={openDate}></input>부터
                <input type="date" onChange={closeDate}></input>까지
            </div>
            <div className='pfSaveDiv'>
                <br/>
            <Link to='/PFmyview' id='savePF' onClick={saveProfile}>저 장</Link>
            </div>
        </div>
    </div>
  )
}

export default PFcreate