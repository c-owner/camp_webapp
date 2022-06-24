import React from 'react';
import { Link } from 'react-router-dom';

const CircleSectionComponent = () => {
  let circleId = 0
  const circles = ['전국', '서울', '인천', '경기', '충북', '충남', '세종', '강원', '대전', '경북', '전북', '대구', '경남', '광주', '전남', '울산', '부산', '제주']
  const circleList = circles.map((circle) => (
    <Link to="/">
      <li className="circle-item-box in_block" key={circleId++}>
        <div className="circle-item">
          <span className="circle-item-text">{circle}</span>
        </div>
      </li>
    </Link>
  ))
  return (
    <div>
      <ul className="circle-box">
        { circleList }
      </ul>
    </div>
  )
}

export default CircleSectionComponent;