import React from "react";
import Navbar from "../component/Navbar";
import './style.css'
import gambar from '../img/src/gambarLogin.jpg'
import kepuasan from '../img/src/kepuasan.jpg'
import Footer from "../component/Footer";

function About() {

    return (
        <>
            <Navbar />
            <div id="about" className="row container-fluid justify-content-center">
                <div className="col-10">
                    <div id='logo' className="me-4 ms-5 mt-4 text-center">
                        <h2>Tentang <span>W</span>isata</h2>
                    </div>
                    <div id="about-card" className="mt-5">
                        <div className="row">
                            <div className="col row justify-content-center">
                                <img src={gambar} />
                            </div>
                            <div className="row col align-items-center">
                                <p>Wisata adalah website yang menyediakan akses bagi masyarakat untuk menemukan dan memesan liburan
                                    lebih mudah. Wisata juga dapat membantu anda menemukan tampat liburan atau wisata
                                    yang cocok untuk anda, murah, dan berkualitas.
                                </p>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="row col align-items-center">
                                <p>Wisata akan melakukan inovasi terus menerus agar anda merasa puas dengan pelayanan yang kami berikan,
                                    karena kenyamanan dari anda sangat berarti bagi wisata
                                </p>
                            </div>
                            <div className="col row justify-content-center">
                                <img src={kepuasan} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About