import React from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import { Link } from 'react-router-dom';
import gambar from '../img/src/gambarLogin.jpg'

import { gql, useQuery, useLazyQuery } from '@apollo/client';

const listTrip = gql`
query MyQuery {
    trip {
        deskripsi
        gambar
        harga1
        id
        judul
        path
    }
}
`

function Home() {
    const listTripQuery = useQuery(listTrip)

    return (
        <>
            <Navbar />
            <div id='home'>
                <div id='hero-background'>
                    <div className='hero'>
                        <div className='hero-text'>
                            <h5>Selamat Datang di Wisata</h5>
                            <h1>Kami Pastikan Liburan <br />anda Menyenangkan</h1>
                            <p>percaya pada pengalaman bepergian dengan menyediakan <br /> tempat Wisata yang paling sesuai dan terbaik untuk Anda</p>
                        </div>
                        <div className='hero-button'>
                            <a href='#trip'>
                                <button>Mulai Perjalanan</button>
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <div id='trip' className='container-fluid row justify-content-center mt-3'>
                        <h2 id='judul' className='text-center mb-0'>Mencari Wisata?</h2>
                        <div id='content' className='row col-8'>
                            {listTripQuery.data?.trip.map((list) => {
                                if (list.judul === 'Bali') {
                                    return (
                                        <div className='row mt-5'>
                                            <div className='row col-8 align-items-center'>
                                                <h4 className='text-center'>{list.judul}</h4>
                                                <p>{list.deskripsi}</p>
                                            </div>
                                            <div className='row col justify-content-center'>
                                                <img src={list.gambar} style={{ width: '70%', height: '200px' }} />
                                            </div>
                                        </div>
                                    )
                                }
                                if (list.judul === 'Manado') {
                                    return (
                                        <div className='row'>
                                            <div className='row col justify-content-center'>
                                                <img src={list.gambar} style={{ width: '70%' }} />
                                            </div>
                                            <div className='row col-8 align-items-center'>
                                                <h4 className='text-center'>{list.judul}</h4>
                                                <p>{list.deskripsi}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                            <div className='text-center'>
                                <Link to='/trip'>
                                    <button className='mt-4'>Selengkapnya</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div id='garis' className='row col-8 mt-5'></div>

                    <div id='about' className='container-fluid row justify-content-center mt-5'>
                        <h2 id='judul' className='text-center'>Tentang Kami</h2>
                        <div className='row col-8 mt-4'>
                            <div className='row col justify-content-center'>
                                <img src={gambar} style={{ width: '80%', borderRadius: '50%' }} />
                            </div>
                            <div className='row col-7 align-items-center'>
                                <p>Wisata adalah website yang menyediakan akses bagi masyarakat untuk menemukan dan memesan liburan lebih mudah.
                                    Wisata juga dapat membantu anda menemukan tampat liburan atau wisata yang cocok untuk anda, murah, dan berkualitas.
                                </p>
                            </div>
                        </div>
                        <div className='text-center'>
                            <Link to='/about'>
                                <button className='mt-4'>Selengkapnya</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home