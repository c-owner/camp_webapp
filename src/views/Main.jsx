import React from 'react';
import SectionComponent from '../layouts/SectionComponent';

const Main = () => {
  return (
    <div>
      <div>
        <SectionComponent id="tag" title="어디로갈까?"/>
        <SectionComponent id="circle" title="맘대로하자"/>
        <SectionComponent id="slider" title="슬라이더"/>
      </div>
    </div>
  )
}

export default Main;