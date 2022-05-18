import React from "react";
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import LoadingSvg from "./LoadingSvg";

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

const InsertOrder = gql`
mutation MyMutation($object: order_insert_input!) {
    insert_order_one(object: $object) {
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

export default function ButtonCheckout({listCheckout, data, resetData}) {
    const authQuery = useQuery(authData)
    const [insertOrder, { loading: loadingInsert }] = useMutation(InsertOrder, { refetchQueries: [listTrip] })

    const masukCheckout = (v) => {
        const user = authQuery.data?.auth.find(v => v.username === localStorage.getItem('username'))
        insertOrder({
            variables: {
                object: {
                    judul: v.judul,
                    harga1: v.harga1,
                    path: v.path,
                    deskripsi: v.deskripsi,
                    gambar: v.gambar,
                    jumlah: 1,
                    auth_id: user.id,
                    nama_depan: data.namaDepan,
                    nama_belakang: data.namaBelakang,
                    no_hp: data.noHp,
                    email: data.email
                }
            }
        })
        resetData()
        console.log(v)
    }

    if(loadingInsert) {
        return <LoadingSvg />
    }

    return (
            <button onClick={() => masukCheckout(listCheckout)}>Checkout</button>
    )
}