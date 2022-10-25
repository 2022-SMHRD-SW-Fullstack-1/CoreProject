import '../css/SJ.css'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import man from '../asset/imgSJ/사람이미지.png'
import MPmenu from '../components/MPmenu';

const PFnone = () => {

  return (
    <div width="990px" className='top_div'>
      <MPmenu></MPmenu>
      <div  className='pfNoneDiv'>
      <img src={man} width="600px" height="500px">
      </img>
      <h1>프로필이 존재하지 않습니다</h1>
      <Link to='/PFcreate' id='makePF'>프로필 생성</Link>
      </div>
    </div>
  )
}

export default PFnone