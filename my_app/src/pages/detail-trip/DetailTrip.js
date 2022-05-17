import React, { useEffect, useState } from "react";
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { useParams } from "react-router-dom";
import './style.css'
import { Link } from 'react-router-dom'

import Button from '../../component/ButtonCart'
import ButtonOrder from '../../component/ButtonOrder'
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";

import { user } from 'react-icons-kit/typicons/user'
import { Icon } from 'react-icons-kit'

const listTrip = gql`
query MyQuery {
    trip {
        deskripsi
        gambar
        id
        judul
        path
        harga1
    }
}
`

const listComment = gql`
query MyQuery {
    comment {
        id
        name
        comment
        trip_id
    }
}
`

const InsertComment = gql`
mutation MyMutation($object: comment_insert_input!) {
    insert_comment_one(object: $object) {
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

function DetailTrip() {

    const listTripQuery = useQuery(listTrip)
    const authQuery = useQuery(authData)
    const listCommentQuery = useQuery(listComment)
    const [insertComment, { loading: loadingInsert }] = useMutation(InsertComment, { refetchQueries: [listTrip] })
    let { judul } = useParams()

    const baseData = {
        commentTrip: '',
    }

    const [data, setData] = useState(baseData)


    const onChangeComment = e => {
        const name = e.target.name
        const value = e.target.value

        setData({
            ...data,
            [name]: value
        })
    }
    
    const resetData = () => {
        setData(baseData)
    }

    const onSubmitCommnet = e => {
        const list = listTripQuery.data?.trip.find(list => list.judul === judul)
        const user = authQuery.data?.auth.find(v => v.username === localStorage.getItem('username'))
        insertComment({
            variables: {
                object: {
                    name: user.username,
                    comment: data.commentTrip,
                    trip_id: list.id,
                    auth_id: user.id
                }
            }
        })
        resetData()
    }

    if (listTripQuery.loading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <Navbar />
            <div className="detailPages">
                {listTripQuery.data?.trip.filter(list => list.judul === judul).map((list) => (
                    <div className="container-fluid row">
                        <div className="col">
                            <img style={{ height: '400px', width: '100%' }} src={list.gambar} />
                        </div>
                        <div className="col align-items-center d-flex row">
                            <div>
                                <h1>{list.judul}</h1>
                                <p>{list.deskripsi}</p>
                                <h5>{list.harga1}</h5>
                                <div>
                                    <Link to='/trip/order'>
                                        <ButtonOrder listOrder={list} />
                                    </Link>
                                    <Button listKeranjang={list} listTrip={listTrip} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="container-fluid row justify-content-center">
                    <div className="col-6">
                        <h5 className="text-center">Bagaimana Tanggapan Anda</h5>
                        <div className="row justify-content-center">
                            <input type='text' name="commentTrip" value={data.commentTrip} onChange={onChangeComment} />
                            <button onClick={onSubmitCommnet}>Submit</button>
                        </div>
                        {listCommentQuery.data?.comment.map((list) => {
                            const listComment = listTripQuery.data?.trip.find(list => list.judul === judul)
                            if (list.trip_id === listComment.id) {
                                return (
                                    <div>
                                        <Icon icon={user} />
                                        <h6>{list.name}</h6>
                                        <p>{list.comment}</p>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DetailTrip