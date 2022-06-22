import React from 'react'
import searchIcon from '../assets/image/icon/ico_srch.png'
import menuBar from '../assets/image/icon/ico_menu.png'
import MapIcon from '../assets/image/icon/map-iconx2.png'
const HeaderMenuItemComponent = () => {
  return (
    <ul>
      <li><img src={ searchIcon } alt="검색" /></li>
      <li><img src={ menuBar } alt="메뉴" /></li>
      <li><img src={ MapIcon } alt="지도" /></li>
    </ul>
  )
}

export default HeaderMenuItemComponent;