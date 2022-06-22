import React from 'react';
import Slider from "react-slick";

let secondId = 0
const secondSliders = ['전국', '서울', '인천', '경기', '충북', '충남', '세종', '강원', '대전', '경북', '전북', '대구', '경남', '광주', '전남', '울산', '부산', '제주']
const secondList = secondSliders.map((secondSlider) => (
  <li className="second-slider-item-box" key={secondId++}>
    <div className="second-slider-item">
      <span className="second-slider-item-text">{secondSlider}</span>
    </div>
  </li>
))

const settings = {
  arrows: false,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2.2,
  slidesToScroll: 1
};
const SecondHandSectionComponent = () => {
  return (
    <Slider {...settings}>
      { secondList }
    </Slider>
  )
}

export default SecondHandSectionComponent;