import React, { useState } from "react";
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import './style.css'

const listTrip = gql`
query MyQuery {
    trip {
        deskripsi
        gambar
        harga
        id
        judul
        path
    }
}
`

const InsertKeranjang = gql`
mutation MyMutation($object: keranjang_insert_input!) {
    insert_keranjang_one(object: $object) {
        id
    }
}
`

function DetailBali() {
    const [insertKeranjang, { loading: loadingInsert }] = useMutation(InsertKeranjang, { refetchQueries: [listTrip] })
    const [keranjang, setKeranjang] = useState([])

    const listTripQuery = useQuery(listTrip)

    const masukKeranjang = (value) => {
        insertKeranjang({
            variables: {
                object: {
                    judul: value.judul,
                    harga: value.harga,
                    path: value.path,
                    deskripsi: value.deskripsi,
                    gambar: value.gambar
                }
            }
        })
        console.log(value)
    }

    return (
        <>
            <div className="detailPages">
                {listTripQuery.data?.trip.map((list) => {
                    if (list.judul === 'Bali') {
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
                                            <button onClick={() => masukKeranjang(list)}>Cart</button>
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

export default DetailBali