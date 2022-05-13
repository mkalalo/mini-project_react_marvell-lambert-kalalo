import React from "react";
import { Link } from 'react-router-dom'
import './style.css'

import TripHero from '../img/src/tripHero.jpg'

import { gql, useQuery, useLazyQuery } from '@apollo/client';

import Button from '../component/ButtonCart'
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const listTrip = gql`
query MyQuery {
    trip {
        deskripsi
        gambar
        harga
        id
        judul
        path
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
                                        <Link to={`/trip/${list.judul}`}><img src={list.gambar} /></Link>
                                        <div className="deskripsi">
                                            <div className="detail">
                                                <div className="text">
                                                    <h3>{list.judul}</h3>
                                                    <h5>Rp. {list.harga}</h5>
                                                </div>
                                                <div className="button row">
                                                    {/* <button className="col">Cart</button> */}
                                                    <div id="buttonn" className="col">
                                                        <Button listKeranjang={list} listTrip={listTrip} />
                                                    </div>
                                                    <button className="col">Order</button>
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