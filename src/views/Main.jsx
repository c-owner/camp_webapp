import React from 'react';
import SectionComponent from '../layouts/SectionComponent';

const Main = () => {
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