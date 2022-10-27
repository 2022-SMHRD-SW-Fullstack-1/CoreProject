import '../css/SJ.css'
import React from 'react'
import { Link } from 'react-router-dom'
import man from '../asset/imgSJ/검정색사람.png'
import MPmenu from '../components/MPmenu'

let choiceCate =[];
const PFcreate = () => {
    const clickBtn=(e)=>{
        if(e.target.className=="pfCategoryBox"){
            e.target.classList.add('pfClickBtn')
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
            choiceCate.push(e.target.innerText)

        }

        console.log(choiceCate)
    }


let category =[
    "동행/돌봄","배달/장보기","동물/벌레퇴치",
    "설치/조립","청소/집안일","역할대행",
    "운반/운송","운전/대리/카풀","재택/부업"
]
let resCate = category.map((item)=>
<button className='pfCategoryBox' id='pfCateHover' onClick={clickBtn} key={item}>
    {item}</button>)


  return (
    <div className='top_div'>
        <MPmenu></MPmenu>
        <div className='pfCreateDiv'>
            <div className="pfImgDiv">
                <img src={man} height="120px"></img>
                <h2>닉네임 : OOO님</h2>
            </div>
            <div className='pfCategory'>
                <div>
                    <span>자신있는 업무</span>
                </div>
                <div>
                {resCate}
                </div>
            </div>
            <div className='pfCategory'>
                <div>
                하고싶은 말
                </div>
                <textarea  id="say" rows="3"></textarea>
                </div>
            <div>
                활동 내역
                <div className='pfActive'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className='pfDate'>
                <div>
                    <br/>
                공개기간
                </div>
                <input type="date"></input>부터
                <input type="date"></input>까지
            </div>
            <div className='pfSaveDiv'>
                <br/>
            <Link to='/PFmyview' id='savePF'>저 장</Link>
            </div>
        </div>
    </div>
  )
}

export default PFcreate