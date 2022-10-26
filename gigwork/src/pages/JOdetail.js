import React, { useState } from 'react'
import userPic from '../asset/imgJY/user.png'
import starpic from '../asset/imgJY/bookmark.png'
import '../css/JOdetail.css'

const JOdetail = () => {

    const [user, setUser] = useState('user')
    const [time, setTime] = useState(
        new Date().toLocaleTimeString()
    )
    const [title, setTitle] = useState('바선생 출몰!!@! 잡아주실 분 구해요 ㅠ')
    const [category, setCategory] = useState('벌레잡기')
    const [content, setContent] = useState('내용입니다')
    const [price, setPrice] = useState('5000')


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
                                <div className='user'> <span>{user}</span> </div>
                            </div>
                            <div className='trustpart'>
                                <span>신뢰도</span>
                            </div>
                        </div>
                    </div>
                    <hr />


                    <div className='contentpart'>
                        <div className='titlepart'>
                            <p id='title'>{title}</p>
                            <br />
                            <div className='subtitle'>
                                <span id='category'>{category}</span>
                                <span id='time'>{time}</span>
                                <span id='write'>작성</span>
                            </div>
                            <div className='contentpart'>
                                <p id='content'>{content}<br /></p>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className='tradepart'>
                        <div className='tradebtn'>
                            <img width='20px' src={starpic} id='bookmark'></img>
                        </div>
                        <div className='price'>
                            <span>{price}원</span>
                        </div>


                        <div className='chat'>
                            <button id='chatbtn'>채팅으로 거래하기</button>
                        </div>


                    </div>


                </div>

            </div>
        </div>

        </div>
    )
}

export default JOdetail