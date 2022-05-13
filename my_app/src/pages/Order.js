import React from "react";
import Navbar from "../component/Navbar";

import './style.css'

import { gql, useQuery, useLazyQuery } from '@apollo/client';

const listOrder = gql`
query MyQuery {
    order {
        auth_id
        deskripsi
        gambar
        harga
        id
        judul
        jumlah
        path
        }
    }
`

function Order() {
    const listOrderQuery = useQuery(listOrder)

    return (
        <>
            <Navbar />
            <div id="order">
                <div className="container-fluid">
                    <div id="container" className="row mt-3 mx-5">
                        <div id="box" className="col">
                            <div id="order-summary" className="my-2 text-center">Order Summary</div>
                            <div className="m-4">
                                {listOrderQuery.data?.order.map((list) => {
                                    return (
                                        <div id="cards" className="mb-3">
                                            <div id="content" className="row">
                                                <div className="col-4 p-0">
                                                    <img src={list.gambar} />
                                                </div>
                                                <div className="col ms-2 mt-1">
                                                    <h4>{list.judul}</h4>
                                                    <h5>Rp. {list.harga}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div id="box-2" className="col bg-dark text-white">
                            <h1 className="text-center py-4">Logo</h1>
                            <div id="content">
                                <form>
                                    <div id="form" className="px-5">
                                        <div className="row">
                                            <input className="mb-3 p-2" type='text' placeholder='masukkan nama anda' required />
                                            <input className="mb-3 p-2" type='text' placeholder='masukkan email anda' required />
                                        </div>
                                        <div className="row mb-2">
                                            <input className="col me-2 p-2" type='text' placeholder="masukkan No Hp anda" required />
                                            <input className="col ms-2 p-2" type='text' placeholder="......" />
                                        </div>
                                    </div>
                                    <div id="button" className="row px-5 d-flex align-items-start">
                                        <input className="mb-2 p-2"  type='submit' value='Checkout'/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order