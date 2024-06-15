import React, { Fragment, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import {clearDeleteOrder, clearError} from '../../slices/orderSlice'
import { adminOrderDetail, orderDelete } from "../../actions/orderAcitons";

const OrderList = () => {
  const { orderDetail ={} ,loading=true,error =null ,isOrderDeleted=null} = useSelector((state) => state.orderState);
  const dispatch = useDispatch();
  

const handleDelete=(e,id)=>{
  e.target.disabled=true
  const data=id
console.log(id);
  dispatch(orderDelete(id))
  
}

  useEffect(() => {
    if (error) {
        toast(error,{
            type:"error",
            onOpen:()=>dispatch(clearError())
        })
        return;

    }
    if (isOrderDeleted) {
        toast('Order Deleted Success',{
            type:'success',
            onOpen:()=>dispatch(clearDeleteOrder())
        })
        return;
    }
    dispatch(adminOrderDetail)

  }, [dispatch,error,isOrderDeleted]);

  const setorder = () => {
    const Data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num Of Items",
          field: "NumOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "Amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    if (orderDetail.length > 0) {
      orderDetail.forEach((order) =>
        Data.rows.push({
          id: order._id,
          NumOfItems: order.orderItems.length,
          Amount: order.totalPrice,
          status: <p style={{color:order.orderStatus.includes('Delivered')?'green':'red'}}>{order.orderStatus}</p>,
          actions: (
            <Fragment>
              
              <Link to={`/admin/updateorder/${order._id}`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
              <button  className="btn btn-primary ml-4 "  onClick={(e)=>handleDelete(e,order._id)}><i className="fa fa-trash"></i></button>
            </Fragment>
          ),
        })
      );
    }
    return Data;
  };

  return (
    <Fragment>
         <div className="row">
         <div className="col-12 col-md-2">
           <SideBar />
         </div>
         <div className="col-12 col-md-10">
           <h1 className="my-4">Orders List</h1>
           { loading ? <Loader/>: <MDBDataTable 
             data={setorder()}
             striped
             bordered
             hover
             className="px-3"
           />}
         </div>
       </div>
     
    </Fragment>
  );
};

export default OrderList;
