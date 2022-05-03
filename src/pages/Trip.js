import React from "react";
import { Link } from 'react-router-dom'
import './style.css'

import { gql, useQuery, useLazyQuery } from '@apollo/client';

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
            <h1>Trip!</h1>
            <div id="trip">
                <div className="row container-fluid">
                    <div className="row justify-content-center">
                        {listTripQuery.data?.trip.map((list) => (
                            <div className="row col-4 d-inline-block">
                                <div>
                                    <Link to={list.path}>
                                        <div className="cards">
                                            <img src={list.gambar} />
                                            <div className="deskripsi">
                                                <div className="detail">
                                                    <div className="text">
                                                        <h3>{list.judul}</h3>
                                                        <h5>Rp. {list.harga}</h5>
                                                    </div>
                                                    <div className="button row">
                                                        <button className="col">Cart</button>
                                                        <button className="col">Order</button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <p>{list.deskripsi}</p> */}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Trip