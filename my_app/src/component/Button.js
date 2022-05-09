import React, { useState } from "react";

import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';

import './style.css'

const InsertKeranjang = gql`
mutation MyMutation($object: keranjang_insert_input!) {
    insert_keranjang_one(object: $object) {
        id
    }
}
`

export default function Button({listKeranjang, listTrip}) {
    const [insertKeranjang, { loading: loadingInsert }] = useMutation(InsertKeranjang, { refetchQueries: [listTrip] })

    const masukKeranjang = (value) => {
        insertKeranjang({
            variables: {
                object: {
                    judul: value.judul,
                    harga: value.harga,
                    path: value.path,
                    deskripsi: value.deskripsi,
                    gambar: value.gambar,
                    jumlah: 1
                }
            }
        })
        console.log(value)
    }

    return (
        <>
            <div>
                <button onClick={() => masukKeranjang(listKeranjang)}>Cart</button>
            </div>
        </>
    )
}