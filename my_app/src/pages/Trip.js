import React from "react";
import { Link } from 'react-router-dom'
import './style.css'

import swal from 'sweetalert';

import TripHero from '../img/src/tripHero.jpg'

import { gql, useQuery, useLazyQuery } from '@apollo/client';

import Button from '../component/ButtonCart'
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const listTrip = gql`
query MyQuery {
    trip {
        id
        deskripsi
        gambar
        id
        judul
        path
        harga1
    }
}
`

function Trip() {
    const listTripQuery = useQuery(listTrip)

    return (
        <>
            <Navbar />
            <div id="trip">
                <div id="hero">
                    <div>
                        <h5>Cari tempat liburan yang cocok untuk anda</h5>
                        <input type='text' />
                    </div>
                </div>
                <div id="content" className="row container-fluid">
                    <div className="row justify-content-center">
                        {listTripQuery.data?.trip.map((list) => (
                            <div className="row col-4 d-inline-block">
                                <div>
                                    <div className="cards">
                                        <img src={list.gambar} />
                                        <div className="deskripsi">
                                            <div className="detail">
                                                <div className="text">
                                                    <h3>{list.judul}</h3>
                                                    <h5>{list.harga1.toLocaleString("id-ID", {
                                                        style: 'currency',
                                                        currency: 'IDR'
                                                    })}</h5>
                                                </div>
                                                <div className="button row">
                                                    <div id="buttonn" className="col row">
                                                        <Button listKeranjang={list} listTrip={listTrip} />
                                                    </div>
                                                    <Link className="col row" to={`/trip/${list.judul}`}>
                                                        <button className="col">More</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <p>{list.deskripsi}</p> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Trip