import '../css/SJ.css'
import React, { useEffect, useState } from 'react'
import MPmenu from '../components/MPmenu'
import man from '../asset/imgSJ/검정색사람.png'
import { Link } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar';
import tri from '../asset/imgSJ/노란삼각형.png'
import axios from 'axios'
import up50 from '../asset/imgSJ/face50up.png';
import face50 from '../asset/imgSJ/face50.png';
import up70 from '../asset/imgSJ/face70up.png';
import down30 from '../asset/imgSJ/face30down.png';
import down50 from '../asset/imgSJ/face50down.png';


const PFmyview = () => {

    const [pfImgSrc,setPfImgSrc] = ('N.png')

   
    const idInfo = {id : localStorage.getItem('id')}
    const [viewInfo,setViewInfo] = useState({data:{name:'',cate_one:'',cate_two:'',
    cate_three:'',close_date:'',open_date:'',say:'',mem_trust:50}});

    const [activeInfo,setActiveInfo] = useState([])

    const [evlInfo,setEvlInfo]=useState([])

    const firstView=()=>{
        axios
        .post('gigwork/profile/myview',idInfo)
        .then(res=>setViewInfo(res))
        .catch(e=>console.log(e))

        axios
        .post('gigwork/profile/activeList',idInfo)
        .then(res=>setActiveInfo(res.data.JsonArray))
        .catch(e=>console.log(e))

        axios
        .post('gigwork/profile/evaluation',idInfo)
        .then(res=>setEvlInfo(res.data.JsonArray))
        .catch(e=>console.log(e))

    }

    const [faceImg,setFaceImg] = useState(face50)
    useEffect(()=>{
        firstView();
    },[setViewInfo])

    useEffect(()=>{
        if(viewInfo.data.mem_trust==50){
            setFaceImg(face50)
        }else if(viewInfo.data.mem_trust>50){
            setFaceImg(up50)
        }else if(viewInfo.data.mem_trust>70){
            setFaceImg(up70)
        }else if(viewInfo.data.mem_trust<30){
            setFaceImg(down30)
        }else if(viewInfo.data.mem_trust<50){
            setFaceImg(down50)
        }
    },[firstView])
    

    let resActiveInfo = activeInfo.map((item,idx)=>
    <div key={item+idx}>
        <p>{item.title}</p>
        <span>{item.post_cate}</span>
        <span>{item.match_date}</span>
    </div>)

    let resEvlInfo = evlInfo.map((item,idx)=>
    <div key={item+idx}>
        <p>{item.evl_content}</p>
        <span>{item.evl_point}</span>
        <span>{item.evl_date}</span>
    </div>)

    return (
        <div className='top_div'>
            <MPmenu></MPmenu>
            <div className='pfMyView'>
                <div className="pfImgDiv">
                    <img src={viewInfo.data.img_src} height="120px"></img>
                    <h2>닉네임 : {viewInfo.data.name}님</h2>
                </div>
                <div className='pfCategory'>
                    <div >
                        <div className='faceImg'>
                            <span>나의 신뢰도 {viewInfo.data.mem_trust}</span>
                            <img src={faceImg}></img>
                        </div>
                        <div className='triangle'>
                            <span>최초 신뢰도 50</span>
                            <img src={tri}></img>
                        </div>
                        <ProgressBar striped variant="warning" now={viewInfo.data.mem_trust} />
                    </div>
                    <br />
                    <div>
                        자신있는 업무
                    </div>
                    <br />
                    <div className='catesContainer'>
                        <span className='myCates'>{viewInfo.data.cate_one}</span>
                        <span className='myCates'>{viewInfo.data.cate_two}</span>
                        <span className='myCates'>{viewInfo.data.cate_three}</span>
                    </div>
                </div>
                <div>
                <div>
                    하고싶은 말
                </div>
                <div>
                    <br></br>
                    <div className='mySays'>{viewInfo.data.say}</div>
                    
                </div>
                </div>
                <div>
                    <br />
                    활동 내역
                    <div className='pfActive'>
                        {resActiveInfo}
                    </div>
                </div>
                <br/>
                <div>
                받은 매너 평가
                <div className='pfActive'>
                    {resEvlInfo}
                </div>
            </div>
                <div className='pfDate'>
                    <div>
                        <br />
                        공개기간
                    </div>
                    <div className='pfDateSpace'>

                    <span>{viewInfo.data.open_date}</span> <span>부터</span>
                    <span>{viewInfo.data.close_date}</span> <span>까지</span>
                    </div>
                </div>
                <div className='pfSaveDiv'>
                    <br />
                    <Link to='/PFcorrection' id='savePF'>수 정</Link>
                </div>

            </div>
        </div>
    )
}

export default PFmyview