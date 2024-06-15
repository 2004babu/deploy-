import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdatePassword } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearupdatePassword } from "../../slices/authSlice";



const PasswordUpdate = () => {
const [password,setPassword]=useState('')
const [oldPassword,setOldPassword]=useState('')
const {isAuthenticated,error,isUpdated}=useSelector(state=>state.authState)
const dispatch=useDispatch()
const navigater=useNavigate()


const handleSubmit=(e)=>{
    e.preventDefault()
    const fromdata=new FormData();

    fromdata.append('password',password)
    fromdata.append('oldPassword',oldPassword)
    dispatch(UpdatePassword(fromdata))
}

useEffect(() => {
  if (isUpdated) {
    toast("password Changed.!", {
      type: "success",
      onOpen:()=>{
        dispatch(clearupdatePassword())
      }
    });
    navigater('/myProfile')
    return
  }
  if (error) {
    toast(error, {
      type: "error",
      
    });
    return
  }
}, [isAuthenticated, error,isUpdated,dispatch,navigater]);
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={handleSubmit}>
          <h1 className="mt-2 mb-5">Update Password</h1>
          <div className="form-group">
            <label htmlFor="old_password_field">Old Password</label>
            <input
              type="password"
              id="old_password_field"
              className="form-control"
              value={oldPassword}
              onChange={e=>setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new_password_field">New Password</label>
            <input
              type="password"
              id="new_password_field"
              className="form-control"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordUpdate;
