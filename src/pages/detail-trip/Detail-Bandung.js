import React from "react";
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import './style.css'

const listTrip = gql`
query MyQuery {
    trip {
        deskripsi
        gambar
        harga
        id
        judul
    }
}
`

function DetailBandung() {
    const listTripQuery = useQuery(listTrip)

    return (
        <>
            <div className="detailPages">
                {listTripQuery.data?.trip.map((list) => {
                    if (list.judul === 'Bandung') {
                        return (
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
                                            <button>Order</button>
                                            <button>Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </>
    )
}

export default DetailBandung