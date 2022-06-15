import React, { Component } from 'react'
import Slider from "react-slick";

export default class BannerSection extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1
    };
    return (
      <section id='banner_section'>
        <h3>New & Update</h3>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          
          <div>
            <h3>2</h3>
          </div>
        </Slider>
      </section>
    )
  }
}
