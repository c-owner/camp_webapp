import React from 'react';
import CircleSectionComponent from '../components/CircleSectionComponent';
import SliderSectionComponent from '../components/SliderSectionComponent';
import TagSectionComponent from '../components/TagSectionComponent';

const SectionComponent = (props) => {

  const SectionBrancher = (props) => {
    switch (props) {
      case 'tag': return <TagSectionComponent />;
      case 'circle' : return <CircleSectionComponent />;
      case 'slider': return <SliderSectionComponent/>
    }
  }
  return (
    <div>
      <h3>{props.title}</h3>
      { SectionBrancher(props.id) }
    </div>
  )
}

export default SectionComponent;