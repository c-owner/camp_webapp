import React from 'react';
import logo from '../assets/logo/header_logo.png'
import HeaderMenuItemComponent from '../components/HeaderMenuItemComponent';

const Header = () => {
    return (
        <div>
            <div>
                <img src={ logo } className="Main-logo" alt="메인로고" />
            </div>
            <HeaderMenuItemComponent/>
        </div>
    )
}

export default Header;