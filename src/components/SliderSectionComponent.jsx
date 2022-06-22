import React from 'react';
import Slider from "react-slick";

let sliderId = 0
const sliders = ['전국', '서울', '인천', '경기', '충북', '충남', '세종', '강원', '대전', '경북', '전북', '대구', '경남', '광주', '전남', '울산', '부산', '제주']
const circleList = sliders.map((slider) => (
  <li className="slider-item-box" key={sliderId++}><div className="slider-item"><span className="slider-item-text">{ slider }</span></div></li>
))
const settings = {
  arrows: false,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2.2,
  slidesToScroll: 1
};

const SliderSectionComponent = () => {
  return (
    <Slider {...settings}>
      { circleList }
    </Slider>
  )
}

export default SliderSectionComponent;