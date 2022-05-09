import React, { useState } from "react";

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
        jumlah
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

export default function Keranjang() {
    const listTripQuery = useQuery(listTrip)
    const [insertCheckout, { loading: loadingInsert }] = useMutation(InsertCheckout, { refetchQueries: [listTrip] })
    const [checked, setChecked] = useState(false)

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