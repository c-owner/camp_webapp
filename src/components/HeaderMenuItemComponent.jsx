import React from 'react'
import searchIcon from '../assets/image/icon/ico_srch.png'
import menuBar from '../assets/image/icon/ico_menu.png'
import MapIcon from '../assets/image/icon/map-iconx2.png'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

const HeaderMenuItemComponent = () => {
  // let navigate = useNavigate();
  // function handleClick() {
  //   navigate("/search")
  // }
  return (
    <ul className="header-icon-box in_block">
      <Link to="/search"><li className="header-icon in_block"><img className="w100p h100p" src={ searchIcon } alt="검색" /></li></Link>
      <Link to="/search"><li className="header-icon in_block ml10"><img className="w100p h100p" src={ menuBar } alt="메뉴" /></li></Link>
      <Link to="/search"><li className="header-icon in_block ml10"><img className="w100p h100p" src={ MapIcon } alt="지도" /></li></Link>
    </ul>
  )
}

export default HeaderMenuItemComponent;