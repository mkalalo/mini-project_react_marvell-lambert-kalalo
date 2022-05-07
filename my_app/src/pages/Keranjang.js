import React from "react";

import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client'

const listTrip = gql`
query MyQuery {
    keranjang {
        deskripsi
        gambar
        harga
        id
        judul
        path
    }
}
`

export default function Keranjang() {

    const listTripQuery = useQuery(listTrip)

    return (
        <>

            <div id="keranjang" className="container-fluid">
                <div id="header">
                    <h1>Cart</h1>
                </div>
                <div id="container">
                    <div id="content" className="">
                        {listTripQuery.data?.keranjang.map((list) => (
                            <div id="box" className=''>
                                <div id="card" className=''>
                                    <div className=''>
                                        <input id="checkbox" className="" type='checkbox' />
                                        <img className="" style={{ height: '150px', width: '150px' }} src={list.gambar} />
                                    </div>
                                    <div className=''>
                                        <h4>{list.judul}</h4>
                                        <h5>{list.harga}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id="detail">
                        <div>
                            <h1>detail</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}