import React, { Component } from 'react'
import BannerSection from '../components/BannerSection'
import CampingMapAreaComponent from "../components/map/CampingMapAreaComponent";


export default class Main extends Component {
  render() {

    return (
      <>
        <div id='main_wrap'>
          <BannerSection/>
          <section id='region_section'>
            지역 색션
          </section>
          <section id='map_section'>
            <CampingMapAreaComponent />
          </section>
        </div>
      </>
    )
  }
}
