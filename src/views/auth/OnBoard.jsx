import {Button} from "@mui/material";


const OnBoard = () => {
    return (
        <div className="onboard">
            <div className="onboard-container">
                <div className="onboard-text">캠핑친구24</div>
            </div>

            <div className="onboard-btn-wrap">
                <div className="onboard-btn">
                    <Button className="app-btn" variant="outlined" color="success"
                            onClick={() => window.location.href = '/login'}>
                    로그인</Button>
                </div>
                <div className="onboard-btn">
                    <Button className="app-btn" variant="contained"
                            onClick={() => window.location.href = '/register'}
                            color="primary">회원가입</Button>
                </div>
            </div>
        </div>
    )
}

export default OnBoard;