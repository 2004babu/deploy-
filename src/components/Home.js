import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { clearError } from "../slices/productSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { products = [], loading = true, error=null, productsCount =0, resPerPage =0 } = useSelector((state) => state.productsState);
  const [currentPage, setCurrentPage] = useState(1);
  
  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearError()); // Clear error to prevent infinite loop
    }

    dispatch(getProducts(null, null, null, null, currentPage));

    // No cleanup function needed here
  }, [error, dispatch, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Buy Best Products'} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products && products.map((product) => (
                <Product col={3} key={product._id} product={product} />
              ))}
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={'Next'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemclassName={'page-item'}
                linkclassName={'page-link'}
              />
            </div>
          ) : null} 
        </Fragment>
      )}
    </Fragment>
  );
}
