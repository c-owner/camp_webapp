import {authCheck, login} from 'services/api/member.js';
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import UndoIcon from "@mui/icons-material/Undo";

let id = '';
let password = '';

const getCheck = async () => {

    return await authCheck("/auth").then(res => {
        if (res.data.success === true) {
            alert('로그인 성공')
            return true;
        } else {
            alert('로그인 화면으로 이동합니다.')
            return false;

        }
    });
}

const loginSubmit = async () => {
    let params = {
        email: document.getElementById("user_id").value,
        password: document.getElementById("user_password").value,
    }
    await login("/auth", params).then((res) => {
        localStorage.setItem("token", res.data.token);
    });
}

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-container">
            <div className="auth_header">
                <UndoIcon className="cursor" onClick={() => {
                    window.history.back();
                }}/>
            </div>
            <div className="login-container">

                <h1>Login</h1>
                <Button onClick={getCheck}>Check</Button>
                <div id="login_wrap">
                    <TextField id="user_id" label="아이디" variant="standard" defaultValue={id}/>
                    <TextField id="user_password" label="비밀번호" variant="standard" defaultValue={password}/>
                    <Button onClick={loginSubmit} variant="contained" color="primary">로그인</Button>
                </div>
            </div>
        </div>
    )
}

export default Login;
