import React from 'react';
import { Link } from 'react-router-dom';

const TagSectionComponent = () => {
  let regionId = 0
  const regions = ['전국', '서울', '인천', '경기', '충북', '충남', '세종', '강원', '대전', '경북', '전북', '대구', '경남', '광주', '전남', '울산', '부산', '제주']
  const regionList = regions.map((region) => (
    <Link to="/search"><li className="tag-item-box" key={regionId++}>
      <span className="tag-item">{region}</span>
    </li></Link>
  ))
  return (
    <div>
      <ul className="tag-box">
        { regionList }
      </ul>
    </div>
  )
}

export default TagSectionComponent;