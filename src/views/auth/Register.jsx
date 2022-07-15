import { Link } from 'react-router-dom';
import {Button} from "@mui/material";
import kakaoIcon from '../../assets/image/icons/social_kakao.webp';
import naverIcon from '../../assets/image/icons/social_naver.png';
import facebookIcon from '../../assets/image/icons/social_facebook.png';
import appleIcon from '../../assets/image/icons/social_apple.png';
import normalIcon from '../../assets/image/icons/normal_login.png';

const Register = () => {
  return (
    <div className='register'>
      <div className='register-container pl15 pr15'>
        <div className='register-text'>회원가입 방식을 선택하세요</div>
        <Button className='register-btn register-btn-kakao' style={{
          backgroundColor: "transparent",
          padding: "18px 36px",
          fontSize: "1.2rem"
    }}>
          <img src={kakaoIcon} />
          <div>카카오톡으로 가입하기</div>
        </Button>
        <Button className='register-btn register-btn-naver' style={{
        backgroundColor: "transparent",
        padding: "18px 36px",
        fontSize: "1.2rem"
      }}>
          <img src={naverIcon} />
          <div>네이버로 가입하기</div>
        </Button>
        <Button className='register-btn register-btn-facebook' style={{
        backgroundColor: "transparent",
        padding: "18px 36px",
        fontSize: "1.2rem"
      }}>
          <img src={facebookIcon} />
          <div>페이스북으로 가입하기</div>
        </Button>
        <Button className='register-btn register-btn-apple' style={{
        backgroundColor: "transparent",
        padding: "18px 36px",
        fontSize: "1.2rem"
      }}>
          <img src={appleIcon} />
          <div>Apple로 가입하기</div>
        </Button>
        <Link to='/register/noraml' style={{ textDecoration: 'none' }}>
          <Button className='register-btn register-btn-normal' style={{
              backgroundColor: "transparent",
              padding: "18px 36px",
              fontSize: "1.2rem"
            }}>
            <img src={normalIcon} />
            <div>일반회원으로 가입하기</div>
          </Button>
          </Link>
        </div>
    </div>
  )
}

export default Register;