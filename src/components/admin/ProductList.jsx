import React, { Fragment, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import {clearError} from '../../slices/productsSlice'
import { clearProductDeleted } from "../../slices/productSlice";

const ProductList = () => {
  const { products = [] ,loading=true,error =null } = useSelector((state) => state.productsState);
  const { isProductDeleted,error:deleteTimeError} = useSelector((state) => state.productState);
  const dispatch = useDispatch();

const handleDelete=(e,id)=>{
  e.target.disabled=true
  const data=id
console.log(id);
  dispatch(deleteProduct(id))
  
}

  useEffect(() => {
    if (error||deleteTimeError) {
        toast(error||deleteTimeError,{
            onOpen:()=>dispatch(clearError())
        })
        return;

    }
    if (isProductDeleted) {
        toast('product Deleted Success',{
            onOpen:()=>dispatch(clearProductDeleted())
        })
        return;
    }
    dispatch(getAdminProducts)

  }, [dispatch,error,isProductDeleted,deleteTimeError]);

  const setData = () => {
    const Data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
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

    if (products.length > 0) {
      products.forEach((product) =>
        Data.rows.push({
          id: product._id,
          name: product.name,
          price: product.price,
          stock: product.stock,
          actions: (
            <Fragment>
              
              <Link to={`/admin/product/${product._id}`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
              <button  className="btn btn-primary ml-4 "  onClick={(e)=>handleDelete(e,product._id)}><i className="fa fa-trash"></i></button>
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
           <h1 className="my-4">Product List</h1>
           { loading ? <Loader/>: <MDBDataTable 
             data={setData()}
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

export default ProductList;
