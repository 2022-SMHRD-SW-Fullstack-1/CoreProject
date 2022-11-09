import React, { useEffect, useState } from 'react'
import userPic from '../asset/imgJY/user.png'
import starpic from '../asset/imgJY/bookmark.png'
import '../css/JOdetail.css'
import voidpic from '../asset/imgJY/void.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const JOdetail = () => {

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

    //path="/JOlist" Link to={`/${num}`}

    
    



    
    // const [user, setUser] = useState('user')
    // const [time, setTime] = useState(
        //     new Date().toLocaleTimeString()
        // )
        // const [title, setTitle] = useState('바선생 출몰!!@! 잡아주실 분 구해요 ㅠ')
        // const [category, setCategory] = useState('벌레잡기')
        // const [content, setContent] = useState('내용입니다')
        // const [price, setPrice] = useState('5000')
        
        const [bookMarkIcon, setbookMarkIcon] = useState(voidpic);
  
        
    
    
    
    
    var str = decodeURI(window.location.search);
    const params = new URLSearchParams(str);
    const proDetail = { post_num: params.get('post_num') }
    console.log("값", proDetail)
    
    
    

    console.log(localStorage.id)
    const [postdetail, setPostdetail] = useState({})
    const [bookmark, setBookmark] = useState(false)

   useEffect(()=>{

       axios
       .post('gigwork/my/mypost',proDetail)
       .then(res=>setPostdetail(res.data))
       .catch(e=>console.log(e))
    },[])


    const [getNick, setGetNick] = useState([])
   
    // useEffect(()=>{
    //     axios
    //     .post('gigwork/my/member', proDetail)
    //     .then((res)=>
    //     {setGetNick(res.data.name)
    //     console.log("받아온 닉네임", res.data[0].name)
    //     .catch(e=>console.log(e))
    // })
    // }, [])



     const urgentmark = <span> {postdetail.urgent}</span>
     const [bookmarkcount, setBookmarkcount] = useState()
     
    //  axios
    //  .post('gigwork/my/searchBookmark', {mem_id: localStorage.getItem("id"), post_num: proDetail.post_num} )
    //  .then(res=>setBookmarkcount(res.data))
    //  .catch(e=>console.log(e))
    
    
     const clickBookmark = (e) => {
        if (e.target.checked === false) {
            setbookMarkIcon(starpic)
        }else{
            setbookMarkIcon(voidpic)
        }
        axios
        .post('gigwork/my/mybookmark', {mem_id: localStorage.getItem("id"), post_num: proDetail.post_num})
        .then(res => console.log(res))
        .catch(e => console.log(e))
    }

    if (bookmarkcount === 1) {
        axios
        .post('gigwork/my/')
    }

// ===========================북마크저장기능==============================
    
    const [bookmartinfo, setBookmarkInfo] = useState([])

    
    
   
   
    //==============[북마크저장기능]  
    // useEffect(()=>{
    //     // setBookmarkInfo({memId:'N', postCate:category, postPay:pay,
    //     //         postOffer:offer, workStart:startdate, workEnd:enddate, lat:locY,
    //     //         lng:locX, urgent:urgent, title:title, content:content,imgSrc:'N',regDate:'N'})
    //     console.log(bookmartinfo)
    //   },[bookmark])
    //   const createPost=()=>{
    //     console.log(postInfo)s
    //     axios
    //     .post('/gigwork/my/wishlist', bookmarkinfo)
    //     .then(res=>console.log(res))
    //     .catch(e=>console.log(e));
    //   }

    
    

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
                                { postdetail.title}
                            <br />
                            <div className='subtitle'>
                                <span id='category'> 
                              { postdetail.post_cate} 
                                </span>
                                <span id='time'>
                                { postdetail.reg_date}                                     
                                </span>
                                <span id='write'>작성</span>
                            </div>
                            <div className='contentpart'>
                                <p id='content'>
                                     { postdetail.content} 
                                     <br /></p>
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
                    <span>{ postdetail.urgent}</span>
                        { urgentmark  === 1 ? <span></span> : <div className='urgentmark'>급구</div> }
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