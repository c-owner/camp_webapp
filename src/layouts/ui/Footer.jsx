import React from 'react';
import {useNavigate} from "react-router-dom";
import MapIcon from '@mui/icons-material/Map';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import {Button} from "@mui/material";

const Footer = () => {
    const navigate = useNavigate();
    const moveUrl = (url) => {
        navigate(url);
    };
    // 숨길 헤더들
    if (window.location.pathname === '/onboard') return (
        <>
            <div>
                <div className="none"></div>
            </div>
        </>
    );

    return (
        <div id="footer">
            <div className="footer">
                <div className="flex-center h100p">
                    <Button onClick={() => moveUrl('/')}
                            className="in_block" variant="text" color="primary">
                        <HomeIcon className='ft-32'/>
                        <div className='btn-name'>메인</div>
                    </Button>
                    <Button className="in_block" variant="text" color="primary">
                        <SearchIcon className='ft-32'/>
                        <div className='btn-name'>검색</div>
                    </Button>
                    <Button className="in_block" variant="text" color="primary">
                        <MapIcon className='ft-32'/>
                        <div className='btn-name'>지도</div>
                    </Button>
                    <Button onClick={() => moveUrl('/login')}
                            className="in_block" variant="text" color="primary">
                        <PersonIcon className='ft-32'/>
                        <div className='btn-name'>마이페이지</div>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Footer;