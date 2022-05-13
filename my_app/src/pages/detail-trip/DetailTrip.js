import React from "react";
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import './style.css'

import Button from '../../component/ButtonCart'
import ButtonOrder from '../../component/ButtonOrder'
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";

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

function DetailTrip() {
    const listTripQuery = useQuery(listTrip)
    let { judul } = useParams()

    return (
        <>
            <Navbar />
            <div className="detailPages">
                {listTripQuery.data?.trip.filter(list => list.judul === judul).map((list) => (
                    <div className="container-fluid row">
                        <div className="col">
                            <img style={{ height: '400px', width: '100%' }} src={list.gambar} />
                        </div>
                        <div className="col align-items-center d-flex row">
                            <div>
                                <h1>{list.judul}</h1>
                                <p>{list.deskripsi}</p>
                                <h5>{list.harga}</h5>
                                <div>
                                    <ButtonOrder listOrder={list} />
                                    <Button listKeranjang={list} listTrip={listTrip} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    )
}

export default DetailTrip