import React from "react";

import { Icon } from 'react-icons-kit'
import { socialInstagram } from 'react-icons-kit/typicons/socialInstagram'
import { socialTwitter } from 'react-icons-kit/typicons/socialTwitter'
import { socialFacebook } from 'react-icons-kit/typicons/socialFacebook'
import {mail} from 'react-icons-kit/typicons/mail'
import {phone} from 'react-icons-kit/typicons/phone'

import { Link } from "react-router-dom";

function Footer() {

    return (
        <>
            <div id="footer" className="mt-5">
                <div className="container-fluid row justify-content-center">
                    <div id='logo' className="col-2 me-4 ms-5">
                        <h4><span>W</span>isata</h4>
                    </div>
                    <div id="box" className="col-8 row justify-content-center">
                        <div className="col">
                            <h5>Contact us</h5>
                            <div id="list" className="row">
                                <span>
                                    <Link to='#'><Icon icon={mail} /> wisata@gmail.com</Link>
                                </span>
                                <span>
                                    <Link to='#'><Icon icon={phone} /> +628 1233 1231</Link>
                                </span>
                            </div>
                        </div>
                        <div className="col">
                            <h5>Follow us</h5>
                            <div id="list" className="row">
                                <span>
                                    <Link to='#'><Icon icon={socialInstagram} /> _wisata-yuk</Link>
                                </span>
                                <span>
                                    <Link to='#'><Icon icon={socialTwitter} /> _wisata-yuk</Link>
                                </span>
                                <span>
                                    <Link to='#'><Icon icon={socialFacebook} /> _wisata-yuk</Link>
                                </span>
                            </div>
                        </div>
                        <div className="col">
                            <h5>Lainnya</h5>
                            <div id="list" className="row">
                            <span>
                                    <Link to='#'>About</Link>
                                </span>
                                <span className="mt-2">
                                    <Link to='#'>Trip</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="copyright" className="my-4">
                    <p className="text-center">Copyright © 2022 Wisata</p>
                </div>
            </div>
        </>
    )
}

export default Footer