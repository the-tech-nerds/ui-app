import React, { Component } from 'react';
import ElementSlider from '../features/theme/element-slider';
import Vegetables from '../../components/layouts/vegetables/main';

class Home extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="container p-0 m-0 mw-100">
                <Vegetables />
            </div>
        )
    }
}


export default Home;