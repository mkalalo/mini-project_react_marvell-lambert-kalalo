import React from 'react'
import Navbar from '../component/Navbar'

function Home() {

    return (
        <>
        <Navbar />
            <div id='home'>
                <div className='hero'>
                    <div className='hero-text'>
                        <h5>Selamat Datang di Wisata</h5>
                        <h1>Kami Pastikan Liburan <br />anda Menyenangkan</h1>
                        <p>percaya pada pengalaman bepergian dengan menyediakan <br /> tempat Wisata yang paling sesuai dan terbaik untuk Anda</p>
                    </div>
                    <div className='hero-button'>
                        <button>Mulai Perjalanan</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home