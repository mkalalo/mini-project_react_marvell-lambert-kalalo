import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";

import './style.css'

import { gql, useQuery, useLazyQuery } from '@apollo/client';
import ButtonCheckout from "../component/ButtonCheckout";

const listTrip = gql`
query MyQuery {
    trip {
        deskripsi
        gambar
        id
        judul
        path
        harga1
    }
}
`

function Order() {
    const CheckoutForm = {
        namaDepan: '',
        namaBelakang: '',
        noHp: '',
        email: '',
    }
    const [data, setData] = useState(CheckoutForm)

    const listTripQuery = useQuery(listTrip)

    if (listTripQuery.loading) {
        return <h1>Loading...</h1>
    }

    const onChangeCheckout = e => {
        const name = e.target.name
        const value = e.target.value

        setData({
            ...data,
            [name]: value
        })
    }

    const resetData = () => {
        setData(CheckoutForm)
    }

    return (
        <>
            <Navbar />
            <div id="order">
                {listTripQuery.data?.trip.map((list) => {
                    const trip = listTripQuery.data?.trip.find(v => v.judul === localStorage.getItem('trip'))
                    if (list.judul === trip.judul) {
                        return (
                            <div className="container-fluid">
                                <div id="container" className="row mt-3 mx-5">
                                    <div id="box" className="col">
                                        <div id="order-summary" className="my-2 text-center">Order Summary</div>
                                        <div className="m-4">
                                            <div id="cards" className="mb-3">
                                                <div id="content" className="row">
                                                    <div className="col-4 p-0">
                                                        <img src={list.gambar} />
                                                    </div>
                                                    <div className="col ms-2 mt-1">
                                                        <h4>{list.judul}</h4>
                                                        <h5>Rp. {list.harga1}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="box-2" className="col bg-dark text-white">
                                        <h1 className="text-center py-4">Logo</h1>
                                        <div id="content">
                                            <form>
                                                <div id="form" className="px-5">
                                                    <div className="row mb-3">
                                                        <input name='namaDepan' value={data.namaDepan} onChange={onChangeCheckout} className="col me-2 p-2" type='text' placeholder="Nama depan anda" required />
                                                        <input name='namaBelakang' value={data.namaBelakang} onChange={onChangeCheckout} className="col ms-2 p-2" type='text' placeholder="Nama belakang anda" required />
                                                    </div>
                                                    <div className="row">
                                                        <input name='noHp' value={data.noHp} onChange={onChangeCheckout} className="mb-3 p-2" type='text' placeholder='No Hp anda' required />
                                                        <input name='email' value={data.email} onChange={onChangeCheckout} className="p-2" type='text' placeholder='Email anda' required />
                                                    </div>
                                                </div>
                                                <div id="button" className="row px-5 d-flex align-items-start">
                                                    <Link to='/transaksi/invoice'>
                                                        <ButtonCheckout data={data} resetData={resetData} listCheckout={list} />
                                                    </Link>
                                                </div>
                                            </form>
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

export default Order