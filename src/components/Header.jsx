import React, { Component } from 'react';

class header extends Component {
  render() {
    return (
      <div id='header_wrap'>
        <h1 id='header_main_logo'>
          <a href="#">
            <h1>mainLogo</h1>
          </a>
        </h1>
        
        <ul id='header_menu_wrap'>
          <li id='header_search' className='header_menu'>
            <a href="#">
              <span>search</span>
            </a>
          </li>

          <li id='header_map' className='header_menu'>
            <a href="#">
              <span>map</span>
            </a>
          </li>

          <li id='header_menubar' className='header_menu'>
            <a href="#">
              <span>menubar</span>
            </a>
          </li>

          <li id='header_signIn' className='header_menu'>
            <a href="#">
              <span>signIn/signUp</span>
            </a>
          </li>
          
        </ul>
      </div>
    );
  }
}

export default header;