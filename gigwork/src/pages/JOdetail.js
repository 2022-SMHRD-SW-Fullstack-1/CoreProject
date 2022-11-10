import React, { useEffect, useState } from 'react'
import userPic from '../asset/imgJY/user.png'
import starpic from '../asset/imgJY/bookmark.png'
import '../css/JOdetail.css'
import voidpic from '../asset/imgJY/void.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const JOdetail = () => {

   
    //post_num 받고 proDetail에 저장하기
    var str = decodeURI(window.location.search);
    const params = new URLSearchParams(str);
    const proDetail = { post_num: params.get('post_num') }
    const [postdetail, setPostdetail] = useState({})
    
    
    
    const [bookMarkIcon, setbookMarkIcon] = useState(voidpic);
    const urgentmark = <span> {postdetail.urgent}</span>
    const [bookmarkcount, setBookmarkcount] = useState()       
    const [bookmark, setBookmark] = useState(false)
    const date = new Date

    // 페이지 이동을 위한 navigate 생성
    const navigate = useNavigate()
    // 채팅 페이지 연결
    const goToChat = () => {
        if(localStorage.getItem('nick') === null) {
            navigate('/login')
        } else {
            axios
            .post('gigwork/chat/createCR', { mem_nick: localStorage.getItem('nick'), partner_nick: postdetail.name, post_num: params.get('post_num')})
            .then(res => console.log(res))
            .catch(e => console.log(e));
            navigate('/chat')
        }
    }
    
    
    useEffect(()=>{
        
        axios
        .post('gigwork/my/mypost',proDetail)
        .then(res=>setPostdetail(res.data))
        .catch(e=>console.log(e))
      
        // bookmark 여부 가져오기
        axios
        .post('gigwork/my/searchBookmark', {mem_id: localStorage.getItem("id"), post_num: proDetail.post_num} )
        .then(res=>{
            setBookmarkcount(res.data)
            console.log('넘어온 값?', res.data)})
            .catch(e=>console.log('오류?', e))
    },[])
    
  
    
    useEffect(()=>{
        const config = {"Content-Type": 'application/json'};

        axios
        .post('gigwork/my/mybookmark', 
        {mem_id: localStorage.getItem("id"), post_num: proDetail.post_num}, config)
        .then(res=>{console.log(res.data)})
        .catch(e=>console.log(e))

    },[bookMarkIcon])
    
   
    
                
    const clickBookmark = (e) => {
        if (bookMarkIcon == starpic) {
           setbookMarkIcon(voidpic)
         }else if(bookMarkIcon == voidpic){
            setbookMarkIcon(starpic)

        }         
    } 

    //콘솔 출력을 위한 값
    console.log("값", proDetail)
    console.log(localStorage.id)
         


                    

    
    
    
    
    
    
 
                
        return (
            <div> <div className='top'>
            <div>

                <div className='containerB'>
                    <div className='toppart'>
                        <div className='userpart'>
                            <div className='picandnick'>
                                <div className='nickpart'>
                                    <img src={userPic} width='20px' id='userpic'></img>
                                     
                                </div>
                                <div className='user'> 
                                <span>{postdetail.name}</span>
                                </div>
                            </div>
                            <div className='trustpart'>
                               {/* <span>신뢰도</span> */}
                            </div>
                        </div>
                    </div>


                    <div className='contentpart'>
                        <div className='titlepart'>
                                <span id='titlepart'>{ postdetail.title} </span>
                            <br />
                            <div className='subtitle'>
                                <span id='category'> 
                              { postdetail.post_cate} 
                                </span>
                                <span id='time'>
                                {new Date(+date + 3240 * 10000).toISOString().replace('T', ' ').replace(/\..*/, '')}                                     
                                </span>
                                <span id='write'>작성</span>
                            </div>
                            <div className='contentpart'>
                                    
                                    <p id='content'>
                                     { postdetail.content} 
                                     <img src={ postdetail.img_src} id='imgcontent'/> 
                                     
                                <br/></p>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className='tradepart'>
                        <div className='tradebtn'>
                           
                        <label htmlFor='bookmark' >     
                        <img width='30px' src={bookMarkIcon}/> 
                        <input type='checkbox' id='bookmark' onClick={clickBookmark} style={{ display: "none" }} />
                        </label>
                        </div>
                    
                        <div>

                        { urgentmark  === 1 ? <span>''</span> : <div className='urgentmark'>급구</div> }
                        </div>
                        <div className='offerbtnpart'>
                        <button id='offerbtn'>제의하기</button>
                        </div>
                        <div className='price'>
                        <span> { postdetail.post_pay } 원</span>
                        </div>


                        <div className='chat'>
                            <button onClick={goToChat} id='chatbtn'>채팅으로 거래하기</button>
                        </div>


                    </div>


                </div>

            </div>
        </div>

        </div>
    )
}

export default JOdetail