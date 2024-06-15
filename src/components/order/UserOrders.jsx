import React, { Fragment, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { userOrder as userOrderAction } from '../../actions/orderAcitons'
import { Link } from 'react-router-dom'

const UserOrders = () => {
    const dispatch = useDispatch()
    const { userOrders = [] } = useSelector(state => state.orderState)

    useEffect(() => {
        dispatch(userOrderAction)
    }, [dispatch])

    const setOrders = () => {
        const Data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num Of Items',
                    field: 'NumOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }

        userOrders.forEach(item => {
            Data.rows.push({
                id: item._id,
                NumOfItems: item.orderItems.length,
                amount: `$${item.totalPrice}`,
                status: item.orderStatus && item.orderStatus ==='Processing'? (<p style={{color:'red'}}>{item.orderStatus}</p>):(<p style={{color:'green'}}>{item.orderStatus}</p>),
                actions: <Link to={`/order/${item._id}`} className='btn btn-primary'> <i className='fa fa-eye'></i></Link>
            })
        })

        return Data
    }

    return (
        <Fragment>
            <MetaData title={'My Orders '} />
            <h1 className='mt-5'>My Orders</h1>
            <MDBDataTable
                className='px-3'
                bordered
                striped
                data={setOrders()}
            />
        </Fragment>
    )
}

export default UserOrders
