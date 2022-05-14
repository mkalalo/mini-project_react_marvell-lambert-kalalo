import React from "react";
import useLocalStorage from 'react-use-localstorage';
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
    const [tripLS, setTripLS] = useLocalStorage('trip')
    const [insertOrder, { loading: loadingInsert }] = useMutation(InsertOrder, { refetchQueries: [listTrip] })

    const getTrip = (v) => {
        setTripLS(listOrder.judul)
        console.log('trip', listOrder.judul)
    }

    return (
        <div>
            <button onClick={() => getTrip(listOrder)}>Order</button>
        </div>
    )
}