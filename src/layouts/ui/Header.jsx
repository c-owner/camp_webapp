import React from 'react';
import {Link} from 'react-router-dom';
import logo from 'assets/logo/header_logo.png'
import HeaderMenuItemComponent from 'components/HeaderMenuItemComponent';

const Header = () => {
    // 숨길 헤더들
    if (window.location.pathname === '/onboard') return (
        <>
            <div>
                <div className="none-header"></div>
            </div>
        </>
    );

    // 숨기지 않은 헤더
    else {
        return (
            <>
                <div id="header" className="pa15 p-fixed w100p">
                    <Link to="/">
                        <div className='header-main-logo in_block'>
                            <img src={logo} className="main-logo" alt="메인로고"/>
                        </div>
                    </Link>
                    <HeaderMenuItemComponent/>
                </div>
            </>
        );
    }
}

export default Header;