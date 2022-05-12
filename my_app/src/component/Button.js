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

const authData = gql` 
query MyQuery {
    auth {
        id
        username
    }
}`

export default function Button({ listKeranjang, listTrip }) {
    const authQuery = useQuery(authData)
    const [insertKeranjang, { loading: loadingInsert }] = useMutation(InsertKeranjang, { refetchQueries: [listTrip] })

    const masukKeranjang = (value) => {
        const user = authQuery.data?.auth.find(v => v.username === localStorage.getItem('username'))
        console.log(user.username)
        insertKeranjang({
            variables: {
                object: {
                    judul: value.judul,
                    harga: value.harga,
                    path: value.path,
                    deskripsi: value.deskripsi,
                    gambar: value.gambar,
                    jumlah: 1,
                    auth_id: user.id
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