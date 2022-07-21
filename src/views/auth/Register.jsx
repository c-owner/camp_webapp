/******
 * Member entity
 * nickname
 * email
 * password
 * addr
 * addr1
 * birthday
 ******/
import UndoIcon from '@mui/icons-material/Undo';

const social_kakao = require('assets/image/icons/social_kakao.webp');
const social_naver = require('assets/image/icons/social_naver.png');
const social_facebook = require('assets/image/icons/social_facebook.png');
const social_apple = require('assets/image/icons/social_apple.png');
const social_google = require('assets/image/icons/social_google.png');
const normal_img = require('assets/image/icons/normal_login.png');

const Register = () => {

    return (
        <div className="auth-container">
            <div className="auth_header">
                <UndoIcon className="cursor" onClick={() => {
                    window.history.back();
                }}/>
            </div>
            <div className="register-container">

                <div className="register_step1">
                    <h1 className="pt30">회원가입 방식을 선택하세요</h1>

                    <div className="register_step1_wrap">
                        <div className="flex-center">
                            <img src={social_kakao} alt="kakao"/>
                            <div className="register_message">카카오로 가입할래요!</div>
                        </div>
                        <div className="flex-center">
                            <img src={social_naver} alt="naver"/>
                            <div className="register_message">네이버로 가입할래요!</div>
                        </div>
                        <div className="flex-center">
                            <img src={social_facebook} alt="facebook"/>
                            <div className="register_message">페이스북으로 가입할래요!</div>
                        </div>
                        <div className="flex-center">
                            <img src={social_apple} alt="apple"/>
                            <div className="register_message">Apple로 가입할래요!</div>
                        </div>
                        <div className="flex-center">
                            <img src={social_google} alt="google"/>
                            <div className="register_message">구글로 가입할래요!</div>
                        </div>
                        <div className="flex-center">
                            <img src={normal_img} alt="normal"/>
                            <div className="register_message">일반 회원 가입할래요!</div>
                        </div>
                    </div>

                </div>

            </div>


        </div>
    );
}

export default Register;
