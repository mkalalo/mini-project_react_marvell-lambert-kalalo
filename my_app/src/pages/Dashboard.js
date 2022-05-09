import { gql, useQuery, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import SidebarDashboard from '../component/Sidebar-Dashboard'
import './style.css'

import { Icon } from 'react-icons-kit'
import { trash2 } from 'react-icons-kit/feather/trash2'

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

const InsertTrip = gql`
mutation MyMutation($object: trip_insert_input!) {
    insert_trip_one(object: $object) {
        id
    }
}
`

const DeleteTrip = gql`
mutation MyMutation($id: Int!) {
    delete_trip_by_pk(id: $id) {
        id
    }
}
`

function Dashboard() {
    const baseData = {
        judulTrip: '',
        hargaTrip: '',
        deskripsiTrip: '',
        gambarTrip: '',
        pathTrip: ''
    }

    const listTripQuery = useQuery(listTrip)
    const [insertTrip, { loading: loadingInsert }] = useMutation(InsertTrip, { refetchQueries: [listTrip] })
    const [deleteTrip, { loading: loadingDelete }] = useMutation(DeleteTrip, { refetchQueries: [listTrip] })

    const [data, setData] = useState(baseData)

    const onChangeTrip = e => {
        const name = e.target.name
        const value = e.target.value

        setData({
            ...data,
            [name]: value
        })
    }

    const onSubmitTrip = e => {
        e.preventDefault();
        insertTrip({
            variables: {
                object: {
                    judul: data.judulTrip,
                    harga: data.hargaTrip,
                    path: data.pathTrip,
                    deskripsi: data.deskripsiTrip,
                    gambar: data.gambarTrip
                }
            }
        })
        resetData()
    }

    const onDeleteItem = (idx) => {
        deleteTrip({
            variables: {
                id: idx,
            }
        })
    }

    const resetData = () => {
        setData(baseData)
    }

    return (
        <>
            <div id='dashboard'>
                <SidebarDashboard />
                <div id='content' className='row container-fluid'>
                    <form onSubmit={onSubmitTrip} className='form col justify-content-center mx-3'>
                        <div className='mx-3 my-3'>
                            <label className='label'>
                                judul
                                <input
                                    type='text'
                                    required
                                    name='judulTrip'
                                    value={data.judulTrip}
                                    onChange={onChangeTrip}
                                />
                            </label>
                            <label className='label'>
                                Harga
                                <input
                                    type='text'
                                    required
                                    name='hargaTrip'
                                    value={data.hargaTrip}
                                    onChange={onChangeTrip}
                                />
                            </label>
                            <label className='label'>
                                Link Gambar
                                <input
                                    type='text'
                                    required
                                    name='gambarTrip'
                                    value={data.gambarTrip}
                                    onChange={onChangeTrip}
                                />
                            </label>
                            <label className='label'>
                                Path
                                <input
                                    type='text'
                                    required
                                    name='pathTrip'
                                    value={data.pathTrip}
                                    onChange={onChangeTrip}
                                />
                            </label>
                            <label className='label'>
                                deskripsi
                                <textarea
                                    rows='5'
                                    type='text'
                                    required
                                    name='deskripsiTrip'
                                    value={data.deskripsiTrip}
                                    onChange={onChangeTrip}
                                />
                            </label>
                            <input
                                type='submit'
                                value='Submit'
                            />
                        </div>
                    </form>
                    <div className='delete col mx-3'>
                        <div className='box'>
                            {listTripQuery.data?.trip.map((list) => (
                                <div className='cards row my-3 container-fluid'>
                                    <div className='col-4'>
                                        <img src={list.gambar} />
                                    </div>
                                    <div className='col-7 justify-content-start'>
                                        <h4>{list.judul}</h4>
                                        <h5>{list.harga}</h5>
                                    </div>
                                    <div className='col-1 row align-items-center'>
                                        <span onClick={() => onDeleteItem(list.id)} className='trash'>
                                            <Icon icon={trash2} />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard