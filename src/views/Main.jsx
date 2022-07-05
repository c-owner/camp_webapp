import React from 'react';
import SectionComponent from 'layouts/SectionComponent';
import {useNavigate} from "react-router-dom";
import {authCheck} from "../services/api/member";

const check = authCheck("/auth").then(res => {
    if (res.data.status === true) {
        return true;
    } else {
        return false;
    }
}).catch((err) => {
    console.log("err", err);
});

const Main = () => {
    const navigate = useNavigate();
/*
    check.then(res => {
        if (!res) {
            alert('로그인 화면으로 이동합니다.')
            navigate("/auth");
        } else {
            alert('로그인 성공')
            navigate("/");
        }
    });*/
    return (
        <div>
            <div className="main-section">
                <SectionComponent id="tag" title="어디로갈까?" detail="최근30일랭킹"/>
                <SectionComponent id="circle" title="인싸캠퍼" detail="순위보기"/>
                <SectionComponent id="slider" title="슬라이더" detail="더보기"/>
                <SectionComponent id="second" title="중고매물" detail="더보기"/>
            </div>
        </div>
    )
}

export default Main;