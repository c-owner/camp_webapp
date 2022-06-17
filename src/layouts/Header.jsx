import React, {Component} from 'react';
import HeaderMenuItem from '../components/HeaderMenuItem';

class header extends Component {
    render() {
        return (
            <div id="header_wrap">
                <div id="header_main_logo"></div>
                <HeaderMenuItem></HeaderMenuItem>
            </div>
        );
    }
}

export default header;
