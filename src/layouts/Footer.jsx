import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <>
        <div id='footer_wrap'>
          <h1 id='footer_main_logo'>
            <a href="src/layouts/Footer#!">
              <h1>mainLogo</h1>
            </a>
          </h1>

          <ul id='footer_menu_wrap'>

          <li className='footer_menu'>
              <a href="src/layouts/Footer#!">
                <span>개인정보처리방침</span>
              </a>
            </li>

            <li className='footer_menu'>
              <a href="src/layouts/Footer#!">
                <span>이용약관</span>
              </a>
            </li>

            <li className='footer_menu'>
              <a href="src/layouts/Footer#!">
                <span>고객센터</span>
              </a>
            </li>

            <li className='footer_menu'>
              <a href="src/layouts/Footer#!">
                <span>회원가입</span>
              </a>
            </li>

            <li className='footer_menu'>
              <a href="src/layouts/Footer#!">
                <span>로그인</span>
              </a>
            </li>
          
          </ul>
        </div>
      </>
    );
  }
}

export default Footer;
