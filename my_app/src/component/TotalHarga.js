import React from "react";
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client'


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
        jumlah_harga
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

function TotalHarga() {
    const listTripQuery = useQuery(listTrip)
    const authQuery = useQuery(authData)
    const user = authQuery.data?.auth.map(user => user.username === localStorage.getItem('username'))
    const mapping = listTripQuery.data?.keranjang.map(list => list)
    // const jumlahTotal = mapping.jumlah * mapping.jumlah_harga
    const Total = mapping.reduce(
        (prevValue, currentValue) => prevValue + currentValue.jumlah_harga*currentValue.jumlah, 0)
    return (
        <div className="row">
            <p className=" col text-start">Total </p>
            <p className=" col text-end">{Total.toLocaleString("id-ID", {
                style: 'currency',
                currency: 'IDR'
            })}</p>
        </div>
    )
}

export default TotalHarga