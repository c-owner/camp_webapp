import React from 'react';
import { useNavigate } from "react-router-dom";
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

    return (
        <div className="footer">
            <a href="https://www.gogetssl.com" rel="nofollow" title="GoGetSSL Site Seal Logo" ><div id="gogetssl-animated-seal" style="width:180px; height:58px;"></div></a> <script src="https://gogetssl-cdn.s3.eu-central-1.amazonaws.com/site-seals/gogetssl-seal.js"></script>
            <div className="flex-center h100p">
                <Button onClick={() => moveUrl('/')}
                    className="in_block" variant="text" color="primary">
                    <HomeIcon className='ft-32' />
                    <div className='btn-name'>메인</div>
                </Button>
                <Button className="in_block" variant="text" color="primary">
                    <SearchIcon className='ft-32' />
                    <div className='btn-name'>검색</div>
                </Button>
                <Button className="in_block" variant="text" color="primary">
                    <MapIcon className='ft-32' />
                    <div className='btn-name'>지도</div>
                </Button>
                <Button onClick={() => moveUrl('/auth')}
                    className="in_block" variant="text" color="primary">
                    <PersonIcon className='ft-32' />
                    <div className='btn-name'>마이페이지</div>
                </Button>
            </div>
        </div>
    )
}

export default Footer;