import React, { Component } from "react";

import "./Footer.css";

class Footer extends Component {
    getYear() {
        return new Date().getFullYear();
    }
    render() {
        return (
            <footer className="mainfooter" role="contentinfo">
                <div className="footer-middle">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <p className="text-center">&copy; {this.getYear()} - ventasOnline.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;