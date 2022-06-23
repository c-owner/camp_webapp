import React from 'react';
import CircleSectionComponent from '../components/CircleSectionComponent';
import SecondHandSectionComponent from '../components/SecondHandSectionComponent';
import SliderSectionComponent from '../components/SliderSectionComponent';
import TagSectionComponent from '../components/TagSectionComponent';
import { Link } from 'react-router-dom';

const SectionComponent = (props) => {

  const SectionBrancher = (props) => {
    switch (props) {
      case 'tag': return <TagSectionComponent />;
      case 'circle' : return <CircleSectionComponent />;
      case 'slider': return <SliderSectionComponent />;
      case 'second': return <SecondHandSectionComponent />;
    }
  }
  return (
    <div className="section-box pa15 mb20">
      <div className='section-box-top mb15'>
        <h3 className="section-title in_block">{props.title}</h3>
        <Link to="/search">
          <div className="section-detail">{props.detail}</div>
        </Link>
      </div>
      { SectionBrancher(props.id) }
    </div>
  )
}

export default SectionComponent;