import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import './style.css'

import { user } from 'react-icons-kit/typicons/user'
import { Icon } from 'react-icons-kit'
import LoadingSvg from '../component/LoadingSvg';

const listOrder = gql`
query MyQuery {
    order {
        auth_id
        deskripsi
        email
        gambar
        id
        judul
        jumlah
        nama_belakang
        nama_depan
        no_hp
        path
        harga1
    }
}`

export default function InVoice() {
    const listOrderQuery = useQuery(listOrder)


    const kembali = () => {
        localStorage.removeItem('trip')
    }

    if (listOrderQuery.loading) {
        return <LoadingSvg />
    }

    return (
        <div id='invoice' className='col-8 container-fluid'>
            {listOrderQuery.data?.order.filter(list => list.judul === localStorage.getItem('trip')).map((list) => {
                return (
                    <div>
                        <div className='row'>
                            <div className='col-6'>
                                <div><Icon icon={user} /></div>
                                <h5 className='mt-2'>{list.nama_depan} {list.nama_belakang}</h5>
                                <div>Phone : {list.no_hp}</div>
                                <div>Email : {list.email}</div>
                            </div>
                            <div className='col-6'>
                                <h4 className='text-end'>Wisata</h4>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <p>Terima kasih atas pesanan anda! Pesanan anda akan dikirim setelah anda melakukan pembayaran.
                                Mohon membayar sebelum 16/5/2022 20:53 (WIB) di toko-toko berikut: Alfamart, AlfaExpress, AlfaMidi,
                                DanDan atau Lawson, menggunakan kode di bawah ini
                            </p>
                            <p>dengan instruksi pembayaran ini :</p>
                            <div className='text-center'>
                                <h5 id='code' className='text-center'>1234 1234 3453 3453</h5>
                            </div>
                        </div>
                        <div className='row justify-content-center'>
                            <p>Order :</p>
                            <div className='row col-6'>
                                <div id='pesan' className='row'>
                                    <div className='col-3'>
                                        <img src={list.gambar} style={{ height: '100px', width: '100px' }} />
                                    </div>
                                    <div className='col-6 ms-2'>
                                        <h5>{list.judul}</h5>
                                        <h6>Rp. {list.harga1}</h6>
                                    </div>
                                </div>
                                <div id='garis'></div>
                                <div className='text-end'>{list.harga1.toLocaleString("id-ID", {
                                    style: 'currency',
                                    currency: 'IDR'
                                })}</div>
                            </div>
                        </div>
                        <div id='button' className='text-center mt-5'>
                            <Link to='/trip'>
                                <button onClick={kembali}>Kembali</button>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}