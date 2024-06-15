
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector}from 'react-redux'
import { clearAuthError, forgotpassword } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ForgotPassword = () => {
    const [email,setEmail]=useState()
    const dispatch=useDispatch();

    const {isAuthenticated,loading,error,message}=useSelector(state=>state.authState)
const navigater=useNavigate()
console.log(message);
    
const handleSubmit=(e)=>{
    e.preventDefault()
    const formdata=new FormData()

    formdata.append('email',email)
    dispatch(forgotpassword(formdata))
}

    useEffect(() => {
        if (isAuthenticated) {
          toast("password Changig link send your Email.!", {
            type: "success",
            
          });
          navigater('/myProfile')
          return
        }
        if (message) {
          toast(message, {
            type: "success"
          });
          return
        }
        if (error) {
          toast(error, {
            type: "error",
            onOpen:()=>{
              dispatch(clearAuthError)
            }
          });
          return
        }
      }, [isAuthenticated,dispatch,message,error]);

  return (
    <div class="row wrapper">
    <div class="col-10 col-lg-5">
        <form class="shadow-lg" onSubmit={handleSubmit}>
            <h1 class="mb-3">Forgot Password</h1>
            <div class="form-group">
                <label for="email_field">Enter Email</label>
                <input
                    type="email"
                    id="email_field"
                    class="form-control"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />
            </div>

            <button
                id="forgot_password_button"
                type="submit"
                class="btn btn-block py-3" disabled={loading}>
                Send Email
            
        </button>

        </form>
    </div>
</div>
  )
}

export default ForgotPassword
