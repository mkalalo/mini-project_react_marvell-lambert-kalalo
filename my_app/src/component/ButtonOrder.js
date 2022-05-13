import React from "react";

import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';

const InsertOrder = gql`
mutation MyMutation($object: order_insert_input!) {
    insert_order_one(object: $object) {
        id
    }
}
`

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

const authData = gql` 
query MyQuery {
    auth {
        id
        username
    }
}`

export default function ButtonCart({ listOrder }) {

    const authQuery = useQuery(authData)
    const [insertOrder, { loading: loadingInsert }] = useMutation(InsertOrder, { refetchQueries: [listTrip] })

    const masukOrder = (v) => {
        const user = authQuery.data?.auth.find(v => v.username === localStorage.getItem('username'))
        insertOrder({
            variables: {
                object: {
                    judul: v.judul,
                    harga: v.harga,
                    path: v.path,
                    deskripsi: v.deskripsi,
                    gambar: v.gambar,
                    jumlah: 1,
                    auth_id: user.id
                }
            }
        })
        console.log(v)
    }

    return (
        <div>
            <button onClick={() => masukOrder(listOrder)}>Order</button>
        </div>
    )
}