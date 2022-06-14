import React, { Component } from 'react';

class header extends Component {
  render() {
    return (
      <div id='header_wrap'>
        <h1 id='header_main_logo'>
          <a href="#">
            <span>mainLogo</span>
          </a>
        </h1>
        
        <ul id='header_menu_wrap'>
          <li id='header_search' className='header_menu'>
            <a href="#">
              <i class="bi bi-search"></i>
              <span>search</span>
            </a>
          </li>

          <li id='header_map' className='header_menu'>
            <a href="#">
              <i class="bi bi-map"></i>
              <span>map</span>
            </a>
          </li>

          <li id='header_menubar' className='header_menu'>
            <a href="#">
              <i class="bi bi-list"></i>
              <span>menubar</span>
            </a>
          </li>

          <li id='header_signIn' className='header_menu'>
            <a href="#">
              <i class="bi bi-person"></i>
              <span>signIn/signUp</span>
            </a>
          </li>
          
        </ul>
      </div>
    );
  }
}

export default header;