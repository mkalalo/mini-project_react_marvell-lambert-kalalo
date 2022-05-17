import React, { useState, useEffect } from "react";

import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client'
import Navbar from "../component/Navbar";
import { Icon } from 'react-icons-kit'
import { trash2 } from 'react-icons-kit/feather/trash2'
import { user } from "react-icons-kit/typicons/user";
import TotalHarga from "../component/TotalHarga";

const listTrip = gql`
query MyQuery {
    keranjang {
        deskripsi
        gambar
        id
        judul
        path
        jumlah
        auth_id
        harga1
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

const DeleteKeranjang = gql`
mutation MyMutation($id: Int!) {
    delete_keranjang_by_pk(id: $id) {
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
    const listKeranjang = useQuery(listTrip)
    const authQuery = useQuery(authData)
    const authQueryDetail = useQuery(authData)
    const [checked, setChecked] = useState(false)
    const [keranjangScroll, setKeranjangScrol] = useState(false)
    const [insertCheckout, { loading: loadingInsert }] = useMutation(InsertCheckout, { refetchQueries: [listTrip] })
    const [deleteKeranjang, { loading: loadingDelete }] = useMutation(DeleteKeranjang, { refetchQueries: [listTrip] })

    const changeBackground = () => {
        if (window.scrollY >= 1) {
            setKeranjangScrol(true)
        } else {
            setKeranjangScrol(false)
        }
    }

    useEffect(() => {
        changeBackground()
        window.addEventListener("scroll", changeBackground)
    }, [])

    if (listTripQuery.loading || authQuery.loading) {
        return <h1>loading...</h1>
    }

    const onDeleteKeranjang = (idx) => {
        deleteKeranjang({
            variables: {
                id: idx,
            }
        })
    }

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
                            const user = authQuery.data?.auth.find(v => v.username === localStorage.getItem('username'))
                            if (list.auth_id === user.id) {
                                return (
                                    <div id="box" className=''>
                                        <div id="card" className=''>
                                            <div className=''>
                                                {/* <input class="checkboxx" className="" onClick={() => checkedKeranjang(list)} checked={checked ? 'checked' : ''} type='checkbox' /> */}
                                                <img className="" style={{ height: '150px', width: '190px' }} src={list.gambar} />
                                            </div>
                                            <div className=''>
                                                <h4>{list.judul}</h4>
                                                <h5>Rp. {list.harga1}</h5>
                                                <h6>Jumlah : {list.jumlah}</h6>
                                            </div>
                                            <button onClick={() => onDeleteKeranjang(list.id)}><Icon icon={trash2} /></button>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div id="detail" className="mt-3 mb-2" >
                        <h4 className="text-center mb-3">Hasil</h4>
                        <div className={keranjangScroll ? 'keranjang active' : 'keranjang'}>
                            {listKeranjang.data?.keranjang.map((list) => {
                                const user = authQueryDetail.data?.auth.find(v => v.username === localStorage.getItem('username'))
                                if (list.auth_id === user.id) {
                                    return (
                                        <div>
                                            <div className="row">
                                                <div className="col-2">
                                                    <img src={list.gambar} style={{ height: '50px', width: '50px' }} />
                                                </div>
                                                <div className="col">
                                                    <div className="ms-2">{list.judul}</div>
                                                    <div className="text-end">{list.harga1}</div>
                                                </div>
                                            </div>
                                            <div id="garis" className="mt-2 mb-2"></div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <TotalHarga />
                    </div>
                </div>
            </div>
        </>
    )
}