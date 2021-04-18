import React, {Component} from 'react';
import SlideToggle  from 'react-slide-toggle';


class BrandBlock extends Component {
    render (){
        const { categories } = this.props;
        return (
            <div className="collection-filter-block">
                <div className="collection-mobile-back">
                    <span className="filter-back">
                        <i className="fa fa-angle-left" aria-hidden="true"></i> back
                    </span>
                </div>
                <SlideToggle>
                    {({onToggle, setCollapsibleElement}) => (
                        <div className="collection-collapse-block">
                            <h3 className="collapse-block-title" onClick={onToggle}>brand</h3>
                            <div className="collection-collapse-block-content" ref={setCollapsibleElement}>
                                <div className="collection-brand-filter">
                                    <ul className="category-list">
                                        {categories.map(category => <li><a href="#">clothing</a></li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </SlideToggle>
            </div>
        )
    }
}
