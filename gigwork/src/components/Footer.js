import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../css/Footer.css'

const Footer = () => {
  return (
    <div className='top_div' id='footer'>
      <div className='footerTop'>
        <div className='smhrd'><span>스마트 인재 개발원</span></div>
        
          <Container>
            <Row>
              <Col xs={12} md={6}>
                <span>대표 : 조성준, 김지연, 오유성, 김설아</span>
              </Col>
              <Col xs={12} md={6}>
                <span>주소 : 광주광역시 동구 예술길 31-1 7층</span>
              </Col>
            </Row>
            <Row>
            <Col xs={12} md={6}><span>사업자등록번호 : 012-34-56789</span></Col>
            <Col xs={12} md={6}><span>메일 : gigwork@smhrd.com</span></Col>
            </Row>
          </Container>
        </div>
      
      <div>
        <span>Copyright © 2022 GIGwork Associates, Inc. All Rights Reserved.</span>
      </div>
    </div>
  )
}

export default Footer