import React from "react";
import Navbar from "../component/Navbar";

export default function Order() {

    return (
        <>
            <Navbar />
            <div id="order">
                <div className="container-fluid">
                    <div className="row mx-5">
                        <div className="col bg-danger">
                            <h6 className="text-center">Order Summary</h6>
                        </div>
                        <div className="col bg-dark text-white">
                            <h1 className="text-center py-4">box 1</h1>
                            <div className="px-5">
                                <div className="row">
                                    <input className="mb-2 p-2" type='text' placeholder='masukkan nama anda' />
                                    <input className="mb-2 p-2" type='text' placeholder='masukkan email anda' />
                                </div>
                                <div className="row mb-2">
                                    <input className="col me-1 p-2" type='text' placeholder="masukkan No Hp anda" />
                                    <input className="col ms-1 p-2" type='text' placeholder="......" />
                                </div>
                                <div className="row">
                                    <button className="mb-2 p-2">Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}