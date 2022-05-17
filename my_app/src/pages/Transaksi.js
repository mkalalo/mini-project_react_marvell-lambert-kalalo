import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";

import { gql, useQuery, useLazyQuery } from '@apollo/client';

const listOrder = gql`
query MyQuery {
    order {
        auth_id
        deskripsi
        email
        gambar
        harga1
        id
        judul
        jumlah
        nama_belakang
        nama_depan
        no_hp
        path
    }
}`

const authData = gql` 
query MyQuery {
    auth {
        id
        username
    }
}`

export default function Transaksi() {
    const authQuery = useQuery(authData)
    const listOrderQuery = useQuery(listOrder)

    if  (authQuery.loading || listOrderQuery.loading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <Navbar />
            <div id='transaksi' className="row container-fluid justify-content-center">
                <div className="row col-10">
                    <div id="header">
                        <h1>Transaksi</h1>
                    </div>
                    {listOrderQuery.data?.order.map((list) => {
                        const user = authQuery.data?.auth.find(v => v.username === localStorage.getItem('username'))
                        if (list.auth_id === user.id) {
                            return (
                                <div id="card" className="row mb-3">
                                    <div className="col-2">
                                        <img src={list.gambar} style={{ width: '150px', height: '150px' }} />
                                    </div>
                                    <div className="col-10">
                                        <h4>{list.judul}</h4>
                                        <h5>{list.harga1}</h5>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}