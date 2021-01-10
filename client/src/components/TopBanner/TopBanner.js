import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import home_banner from "../../assets/home_banner.jpg";

export default class TopBanner extends Component {
    render() {
        return (
            <Parallax
                blur={{ min: -15, max: 15 }}
                bgImage={home_banner}
                bgImageAlt="Top Banner"
                strength={250}
                style={{ height: '35vh' }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-main-text">
                                <h1 className="main-text">{this.props.text}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </Parallax>
        );
    }
}