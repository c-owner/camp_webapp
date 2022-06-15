import React, { Component } from 'react';
import Header_menu_item from './HeaderMenuItem';

class header extends Component {
  render() {
    return (
      <div id='header_wrap'>
        <h1 id='header_main_logo'></h1>
        <Header_menu_item></Header_menu_item>
      </div>
    );
  }
}

export default header;