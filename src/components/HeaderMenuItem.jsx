import React, { Component } from 'react'

export default class Header_menu_item extends Component {
  render() {
    return (
      <ul id='header_menu_wrap'>
        <li id='header_search' className='header_menu'><a href="#"><i class="bi bi-search"></i><span>search</span></a></li>
        <li id='header_map' className='header_menu'><a href="#"><i class="bi bi-map"></i><span>map</span></a></li>
        <li id='header_menubar' className='header_menu'><a href="#"><i class="bi bi-list"></i><span>menubar</span></a></li>
        <li id='header_signIn' className='header_menu'><a href="#"><i class="bi bi-person"></i><span>signIn/signUp</span></a></li>
      </ul>
    )
  }
}
