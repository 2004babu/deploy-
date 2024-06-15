import axios from 'axios';
import { productsFail, productsSuccess, productsRequest, adminProductsRequest, adminProductsSuccess, adminProductsFail } from '../slices/productsSlice';
import { productFail, productSuccess, productRequest, createReviewRequest, createReviewSuccess, createReviewFail, newProductRequest, newProductSuccess, newProductFail, deleteProductRequest, deleteProductSuccess, deleteProductFail, updateProductRequest, updateProductSuccess, updateProductFail, reviewsRequest, reviewsSuccess, reviewsFail, deleteReviewRequest, deleteReviewSuccess, deleteReviewFail } from '../slices/productSlice';

export const getProducts = (keyword, price, category, rating, currentPage) => async (dispatch) => {

    try {  
        dispatch(productsRequest()) 
        let link = `/api/v1/products?page=${currentPage}`;
        
        if(keyword) {
            link += `&keyword=${keyword}`
        }
        if(price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if(category) {
            link += `&category=${category}`
        }
        if(rating) {
            link += `&ratings=${rating}`
        }
        
        const { data }  =  await axios.get(link);
        dispatch(productsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(productsFail(error.response.data.message))
    }
    
}


export const getProduct = id => async (dispatch) => {

    try {  
        dispatch(productRequest()) 
        const { data }  =  await axios.get(`/api/v1/products/${id}`);
        dispatch(productSuccess(data))
    } catch (error) {
        //handle error
        dispatch(productFail(error.response.data.message))
    }
    
}

export const createReview = (reviewData,id) => async (dispatch) => {

    try {  
        const Config={
            Headers:
            {'Content-Type':'application/json'}
        }
        dispatch(createReviewRequest()) 
        const { data }  =  await axios.put(`/api/v1/review/${id}`,reviewData,Config);
        dispatch(createReviewSuccess(data.product))
    } catch (error) {
        //handle error
        dispatch(createReviewFail(error.response.data.message))
    }
    
}

export const getAdminProducts = async (dispatch) => {

    try {  
        dispatch(adminProductsRequest()) 
        const { data }  =  await axios.get(`/api/v1//admin/products`);
        dispatch(adminProductsSuccess(data.Products))
    } catch (error) {
        //handle error
        dispatch(adminProductsFail(error.response.data.message))
    }
    
}

export const createNewProduct =(formdata)=> async (dispatch) => {

    try {  
        dispatch(newProductRequest()) 
        const { data }  =  await axios.post(`/api/v1/products/new`,formdata);
        dispatch(newProductSuccess(data.Product))
    } catch (error) {
        //handle error
        dispatch(newProductFail(error.response.data.message))
    }
    
}
export const deleteProduct =id=> async (dispatch) => {

    if(id===undefined){
        console.log('id :',id);
        return 
    }
    try {  
        dispatch(deleteProduct()) 
         await axios.delete(`/api/v1/products/${id}`);
        dispatch(deleteProductSuccess())
    } catch (error) {
        
        dispatch(deleteProductFail(error.response.data.message))
    }
    
}



export const updateProduct =(id,formdata)=> async (dispatch) => {

    try {  
        const Config={
            Headers:
            {'Content-Type':'application/json'}
        }
        dispatch(updateProductRequest()) 
        const { data }  =  await axios.put(`/api/v1/products/${id}`,formdata,Config);
        dispatch(updateProductSuccess(data.Product))
    } catch (error) {
        //handle error
        dispatch(updateProductFail(error.response.data.message))
    }
    
}

export const getAllReviews =(id)=> async (dispatch) => {

    try {  
       
        dispatch(reviewsRequest()) 
        const { data }  =  await axios.get(`/api/v1/reviews`,{params:{id}});
        dispatch(reviewsSuccess(data))
    } catch (error) {
        dispatch(reviewsFail(error.response.data.message))
    }
    
}

export const deleteReviews =(productId,id)=> async (dispatch) => {

    try {  
       
        dispatch(deleteReviewRequest()) 
         await axios.delete(`/api/v1/reviews`,{params:{productId,id}});
        dispatch(deleteReviewSuccess())
    } catch (error) {
        dispatch(deleteReviewFail(error.response.data.message))
    }
    
}