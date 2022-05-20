import React, { useState } from "react";
import swal from 'sweetalert';

import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';

import './style.css'

const KeranjangList = gql`
query MyQuery {
    keranjang {
        id
        deskripsi
        gambar
        id
        judul
        path
        harga1
        jumlah
        auth_id
        jumlah_harga
        trip_id
    }
}
`
const UpdateKeranjang = gql`
mutation MyMutation($id: Int!, $trip_id: Int!, $jumlah: numeric) {
    update_keranjang_by_pk(pk_columns: {id: $id}, _set: {trip_id: $trip_id, jumlah: $jumlah}) {
        id
    }
}`

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
    const listKeranjangQuery = useQuery(KeranjangList)
    const [insertKeranjang, { loading: loadingInsert }] = useMutation(InsertKeranjang, { refetchQueries: [listTrip] })
    const [updateKeranjang, { loading: loadingUpdateKeranjangMinus }] = useMutation(UpdateKeranjang, { refetchQueries: [listTrip] })

    const masukKeranjang = (value) => {
        const user = authQuery.data?.auth.find(v => v.username === localStorage.getItem('username'))
        listKeranjangQuery.data?.keranjang.map((list) => {
            if (list.trip_id !== value.id) {
                const item = listKeranjangQuery.data?.keranjang.find(v => v.trip_id === value.id)
                console.log('masuk')
                insertKeranjang({
                    variables: {
                        object: {
                            judul: value.judul,
                            harga1: value.harga1,
                            path: value.path,
                            deskripsi: value.deskripsi,
                            gambar: value.gambar,
                            jumlah: 1,
                            auth_id: user.id,
                            jumlah_harga: value.harga1,
                            trip_id: value.id
                        }
                    }
                })
                swal({
                    title: "Berhasil Masuk Keranjang",
                    text: "Berhasil Masuk Keranjang, " + listKeranjang.judul,
                    icon: "success",
                });
            } else {
                const item = listKeranjangQuery.data?.keranjang.find(v => v.id === value.id || v.trip_id === value.id)
                updateKeranjang({
                    variables: {
                        id: item.id,
                        trip_id: value.id,
                        jumlah: item.jumlah + 1,
                    }
                })
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