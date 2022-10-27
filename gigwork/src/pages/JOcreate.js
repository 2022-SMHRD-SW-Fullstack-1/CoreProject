import React, { useEffect, useState, ChangeEvent } from 'react'
import PostCode from '../components/PostCode'
import DaumPostcode from 'react-daum-postcode';
import pic from '../asset/imgJY/pic.png'
import '../css/JOcreate.css'


const JOcreate = () => {

   const job = ['배달장보기', '청소집안일', '설치조립운반', '동행돌봄', '벌레쥐잡기', '역할대행', '운전카풀', '기타원격']

  const [enroll_company, setEnroll_company] = useState({
    address: '',
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



  const [files, setFiles] = useState('');


  const onLoadFile = (e) => {
    encodeFileToBase64(e.target.files[0])
  }

  const preview = () => {
    if (!files) return false;

    const imgEL = document.querySelector('.img_box');

    const reader = new FileReader();

    reader.onload = () => (imgEL.style.backgroundImage = `url(${reader.result})`);
    reader.readAsDataURL(files[0]);
    console.log(reader)
  }

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setFiles(reader.result);
        resolve();
      };
    })
  };



  return (
    <div>
      <div className='topdivB'>
        <div className='postbox'>
          <div className='contentBox'>
            <div className='firstbox'>
              <span>카테고리</span>
              <span id='categoryinput' >
                  <select id='selectbox'>
                  <option value="default">직무를 선택하세요</option>
                  {job && job.map((item, idx) => <option key={item + idx}>{item}</option>)}
                  </select>
              </span>
            </div>
            <div className='salary'>
              <div>
                <span>수당{"\u00A0"}{"\u00A0"}</span>
                <input type="text" id='salarybox' placeholder='수당을 입력해주세요'></input>
              </div>
              <div>
                {"\u00A0"}{"\u00A0"}
              </div>
              <div>
                <input type='checkbox' />{"\u00A0"}
                <span>제의받기</span>
              </div>
              <br />
            </div>
            <div className='datebox'>
              <div className='datepart'>
                <input type='date' border="none"/> {"\u00A0"}부터
                {"\u00A0"}{"\u00A0"}
                <input type='date' /> {"\u00A0"}까지<br />
              </div>

              <div className='timebox'>
                <div className='timepart'> 
                  <input type='time' />{"\u00A0"}부터 {"\u00A0"}{"\u00A0"}
                  <input type='time' />{"\u00A0"}까지
                </div>
                <div>
                  <input type='checkbox' />{"\u00A0"}<span>급구</span>
                </div>
              </div>

              <div className='postcode'>
                <span />근무장소 
                <div className="address_search">
                <input className="user_enroll_text" placeholder="주소를 입력하세요" type="text" required={true} name="address" onChange={handleInput} value={enroll_company.address} />
                  <button onClick={handleComplete} id='adrrbtn'>주소검색</button>
                </div>
                <div>
                  {popup && <PostCode company={enroll_company} setcompany={setEnroll_company}></PostCode>}
                </div>
              </div>
             
               <div className='textpart'>
                <span >글제목</span><br />
                <input type='text' id='posttitle'  placeholder='글제목을 입력하세요'></input>
              </div>
              <div className='textcontext'>
              <span>직무내용</span>
              <textarea id='textArea'  placeholder='직무내용을 입력하세요'></textarea>
              </div>
              <div className='pic'>
              
               <label htmlFor='uploadpic'><img src={pic} id='pic'></img></label>
                <input type="file" multiple accept="image/*" id='uploadpic' style={{ display: "none" }} onChange={(e) => { encodeFileToBase64(e.target.files[0]); }} onClick={preview} />
                <span>{files && <img src={files} alt="preview-img" width='70px' height='70px' />}</span>
                
              </div>
              <div className='postbtn'>
                <button>게시</button>
                <button>취소</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JOcreate