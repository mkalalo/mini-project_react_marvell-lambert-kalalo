import React, { useState, useEffect } from "react";

import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client'
import Navbar from "../component/Navbar";

const listTrip = gql`
query MyQuery {
    keranjang {
        deskripsi
        gambar
        harga
        id
        judul
        path
        jumlah
        auth_id
    }
}
`

const InsertCheckout = gql`
mutation MyMutation($object1: checkout_insert_input!) {
    insert_checkout_one(object: $object1) {
        id
    }
}
`

const authData = gql` 
query MyQuery {
    auth {
        id
        username
    }
}`

export default function Keranjang() {
    const listTripQuery = useQuery(listTrip)
    const authQuery = useQuery(authData)

    const [insertCheckout, { loading: loadingInsert }] = useMutation(InsertCheckout, { refetchQueries: [listTrip] })
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        localStorage.getItem('username')
    }, [])

    const user = authQuery.data?.auth.find(v => v.username === localStorage.getItem('username'))

    const checkedKeranjang = (value) => {
        // const item = listTripQuery.data?.keranjang.find(list => list.id === idx)
        setChecked(!checked)
        if (checked === false) {
            insertCheckout({
                variables: {
                    object1: {
                        judul: value.judul,
                        harga: value.harga,
                        gambar: value.gambar,
                        jumlah: value.jumlah,
                        deskripsi: value.deskripsi,
                        path: value.path,
                    }
                }
            })
            console.log('data masuk')
        } else if (checked === true) {
            console.log('hapus checkout')
        }
    }

    return (
        <>
            <Navbar />
            <div id="keranjang" className="container-fluid">
                <div id="header">
                    <h1>Cart</h1>
                </div>
                <div id="container">
                    <div id="content" className="">
                        {listTripQuery.data?.keranjang.map((list) => {
                            if (list.auth_id === user.id) {
                                return (
                                    <div id="box" className=''>
                                        <div id="card" className=''>
                                            <div className=''>
                                                <input class="checkboxx" className="" onClick={() => checkedKeranjang(list)} checked={checked ? 'checked' : ''} type='checkbox' />
                                                <img className="" style={{ height: '150px', width: '150px' }} src={list.gambar} />
                                            </div>
                                            <div className=''>
                                                <h4>{list.judul}</h4>
                                                <h5>{list.harga}</h5>
                                                <h6>Jumlah : {list.jumlah}</h6>
                                                {/* <button onClick={() => checkedKeranjang(list)}>tambah</button> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
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