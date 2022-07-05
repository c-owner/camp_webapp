import {authCheck} from 'services/api/member.js';

const Login = () => {
    authCheck("/auth").then(res => {
        console.log(res)
    });

    return (
        <div>
            <h1>Login</h1>
        </div>
    )
}

export default Login;