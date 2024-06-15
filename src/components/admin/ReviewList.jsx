import React, { Fragment, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import { clearReviewDeleted,clearError } from "../../slices/productSlice";
import { deleteReviews, getAllReviews } from "../../actions/productActions";

const OrderList = () => {
  const {isReviewDeleted=null ,reviews=[] ,loading=true,error =null } = useSelector((state) => state.productState);
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();
  

const handleDelete=(e,id)=>{
  e.target.disabled=true
  const data=id
console.log(id);
  dispatch(deleteReviews(productId,id))
  
}

const submitHandler=(e)=>{
    e.preventDefault();
    dispatch(getAllReviews(productId))
}
  useEffect(() => {
    if (error) {
        toast(error,{
            type:"error",
            onOpen:()=>dispatch(clearError())
        })
        return;

    }
    if (isReviewDeleted) {
        toast('Review Deleted Success',{
            type:'success',
            onOpen:()=>dispatch(clearReviewDeleted())
        })
        return;
    }
    if (productId!=="") {
        dispatch(getAllReviews(productId))
    }
  }, [dispatch,error,isReviewDeleted]);

  const setorder = () => {
    const Data = {
      columns: [
        {
            label: 'ID',
            field: 'id',
            sort: 'asc'
        },
        {
            label: 'Rating',
            field: 'rating',
            sort: 'asc'
        },
        {
            label: 'User',
            field: 'user',
            sort: 'asc'
        },
        {
            label: 'Comment',
            field: 'comment',
            sort: 'asc'
        },
        {
            label: 'Actions',
            field: 'actions',
            sort: 'asc'
        }
      ],
      rows: [],
    };

    if (reviews.length > 0) {
      reviews.forEach((review) =>
        Data.rows.push({
          id: review._id,
          rating: review.ratings,
          user: review.user.name,
          comment: review.comment,
          actions: (
            <Fragment>
              
              <button  className="btn btn-primary ml-4 "  onClick={(e)=>handleDelete(e,review._id)}><i className="fa fa-trash"></i></button>
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
         <h1 className="my-4">Review List</h1>
         <div className="row justify-content-center mt-5">
                <div className="col-5">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label >Product ID</label>
                            <input 
                                type="text"
                                onChange= {e => setProductId(e.target.value)}
                                value={productId}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn btn-primary btn-block py-2">
                            Search
                        </button>
                    </form>
                </div>
            </div>
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
