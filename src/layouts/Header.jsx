import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/header_logo.png'
import HeaderMenuItemComponent from '../components/HeaderMenuItemComponent';

const Header = () => {
    return (
        <>
            <Link to="/">
                <div className='header-main-logo in_block'>
                <img src={ logo } className="main-logo" alt="메인로고" />
                </div>
            </Link>
            <HeaderMenuItemComponent/>
        </>
    )
}

export default Header;