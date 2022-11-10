import React, { useEffect, useState, ChangeEvent, useRef, Component } from 'react'
import PostCode from '../components/PostCode'
import DaumPostcode from 'react-daum-postcode';
import pic from '../asset/imgJY/pic.png'
import '../css/JOcreate.css'
import axios from 'axios';
import { Link } from 'react-router-dom';


const JOcreate = () => {

  const [pic, setPic] = useState('')
  const handleFile = () => {

  }
  const date = new Date
  const time = new Date(+date + 3240 * 10000).toISOString().substring(0, 16);

  console.log(time)

  let testId = localStorage.getItem('id')


  const job = ['청소/집안일', '동행/돌봄', '벌레/쥐잡기', '배달/장보기', '설치/조립', '팻케어', '대리/카풀', '과외수업', '역할대행', '기타']
  const [zonecode, setZonecode] = useState('')
  const [enroll_company, setEnroll_company] = useState({
    address: ''
  });

  const [popup, setPopup] = useState(false);
  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    })
  }
  const handleComplete = (data) => {
    setPopup(!popup);
  }
  const [category, setCategory] = useState('')



  const [pay, setPay] = useState('')
  const jobpay = (e) => {
    setPay(e.target.value)
    console.log(e.target.value)
  }
  const [urgent, setUrgent] = useState('urgentN.png')


  const urgentYN = () => {
    if (urgent == 'urgentN.png') {
      setUrgent('urgentY.png')
      console.log(urgent)
      setStartdate(new Date(+date + 3240 * 10000).toISOString().substring(0, 16))
      setDisable(true)
    } else {
      setUrgent('urgentN.png')
      console.log(urgent)
      setDisable(false)
    }
  }

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const handle_content_input_change = (e) => {
    setContent(e.target.value)
  }
  const handle_title_input_change = (e) => {
    setTitle(e.target.value)
  }
  const handle_postCode = (e) => {
    setEnroll_company(e.target.zonecode.value)
  }
  const jobRef = useRef()


  const [disable, setDisable] = useState(false)
  const [offer, setOffer] = useState('offerN.png')
  const offerYN = () => {
    if (offer == 'offerN.png') {
      setOffer('offerY.png')

    } else {
      setOffer('offerN.png')
    }
  }


  const [startdate, setStartdate] = useState('')
  const startDate = (e) => {
    setStartdate(e.target.value)
    console.log(e.target.value)
  }
  const [enddate, setEnddate] = useState('')
  const endDate = (e) => {
    setEnddate(e.target.value)
    console.log(e.target.value)
  }

  const [locX, setLocX] = useState(126.91981851928963)
  const [locY, setLocY] = useState(35.14987499845749)
  const [addUrl, setAddUrl] = useState('https://dapi.kakao.com/v2/local/search/address.json?query=서울')
  // 시간구하기


  // 주소를 좌표로 바꾸기


  useEffect(() => {
    setAddUrl('https://dapi.kakao.com/v2/local/search/address.json?query=' + enroll_company.address)

    axios.get(addUrl
      , {
        headers: { Authorization: `KakaoAK 60d5d81294704ed44ae5c3954751b412` }
      }
    )
      .then(res => {
        setLocX(res.data.documents[0].road_address.x)
        setLocY(res.data.documents[0].road_address.y)
      }
      ).catch(e => console.log(e))

  }, [setEnroll_company, handleInput])
  // db로 값 보내주기
  const [postInfo, setPostInfo] = useState('')




  const createPost = () => {
    console.log(postInfo)
    axios
      .post('/gigwork/post/create', postInfo)
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }



  let [imgSrcInfo, setImgSrcInfo] = useState(pic);

  const handleImg = (e) => {
    setImgSrcInfo(e.target.files[0].name);
  }

   let handleCategory = (e) => {
    setCategory(e.target.value)
    console.log(e.target.value)
    if (e.target.value == '청소/집안일') {
      setImgSrcInfo('mainClean.png')
      console.log(category(e.target.value))
    } else if (e.target.value == '동행/돌봄') {
      setImgSrcInfo('together.png')
    } else if (e.target.value == '벌레/쥐잡기') {
      setImgSrcInfo('hunt.png')
    } else if (e.target.value == '배달/장보기') {
      setImgSrcInfo('delivery.png')
    } else if (e.target.value == '설치/조립') {
      setImgSrcInfo('install.png')
    } else if (e.target.value == '팻케어') {
      setImgSrcInfo('pet.png')
    } else if (e.target.value == '대리/카풀') {
      setImgSrcInfo('car.png')
    } else if (e.target.value == '과외수업') {
      setImgSrcInfo('class.png')
    } else if (e.target.value == '역할대행') {
      setImgSrcInfo('role.png')
    }

  }



  useEffect(() => {
    setPostInfo({
      memId: localStorage.getItem("id"), postCate: category, postPay: pay,
      postOffer: offer, workStart: startdate, workEnd: enddate, lat: locY,
      lng: locX, urgent: urgent, title: title, content: content, imgSrc: imgSrcInfo, regDate: time
    })
    console.log(postInfo)
  }, [category, pay, offer, startdate, enddate, locX, locY, urgent, title, content, imgSrcInfo])



  return (
    <div>
      <div className='topdivB'>
        <div className='postbox'>
          <div className='contentBox'>
            <div className='firstbox'>
              <span>카테고리</span>
              <span id='categoryinput' >
                <select id='selectbox' value={category} onChange={handleCategory}>
                  <option value="default">직무를 선택하세요</option>
                  {job && job.map((item, idx) => <option key={item + idx} value={item.value} ref={jobRef} >{item}</option>)}
                </select>
              </span>
            </div>
            <div className='salary'>
              <div>
                <span>수당{"\u00A0"}{"\u00A0"}</span>
                <input type="text" id='salarybox' placeholder='수당을 입력해주세요' value={pay} onChange={jobpay}></input>
              </div>

              <div>
                <input type='checkbox' id='offerYesNo' onChange={offerYN} value={offer} />
                <span>제의받기</span>

              </div>
              <br />
            </div>

            <div className='datebox'>
              <div className='urgentbox'>
                <div className='datepart'>
                  <input type='datetime-local' border="none" onChange={startDate} value={startdate} disabled={disable} id='startdate' /> {"\u00A0"}부터

                  <input type='datetime-local' onChange={endDate} value={enddate} id='enddate' /> {"\u00A0"}까지
                </div>
                <div className='timebox'>
                  <input type='checkbox' onChange={urgentYN} value={urgent} /><span>급구</span>
                </div>
              </div>
              <div className='postcode'>
                <span />근무장소
                <div className="address_search">
                  <input className="user_enroll_text" placeholder="주소를 입력하세요" type="text" required={true} onChange={() => { this.handleInput(); this.address(); }} value={enroll_company.address} />
                  <button onClick={handleComplete} id='adrrbtn'>주소검색</button>
                  {/* <GeoLocation searchKeyword={ enroll_company }/> */}
                </div>
                <div>
                  {popup && <PostCode setzone={setZonecode} company={enroll_company} setcompany={setEnroll_company} onChange={handle_postCode}></PostCode>}
                </div>
              </div>
              <div className='textpart'>
                <span >글제목</span><br />
                <input type='text' id='posttitle' placeholder='글제목을 입력하세요' onChange={handle_title_input_change} value={title}></input>
              </div>
              <div className='textcontext'>
                <span>직무내용</span>
                <textarea id='textArea' placeholder='직무내용을 입력하세요' onChange={handle_content_input_change} value={content}></textarea>
              </div>
              <div className='pic'>
  
                {/* <label htmlFor='uploadpic'>  </label> style={{ display: "none" }} */}
                <input type="file" accept="image/*" id='uploadpic'  onChange={handleImg}  />
                {/* onChange이벤트로 파일 객체에 대한 정보 불러옴*/}
             {/* onClick={preview} */}
                {/* <span>{files && <img src={files} alt="preview-img" width='70px' height='70px' />}</span> */}
              </div>
              <div className='postbtn'>
                <Link to="/JOlist"><button type='submit' id='submitbtn' onClick={createPost}>게시</button></Link>
                <Link to="/"><button id='submitbtn'>취소</button></Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default JOcreate