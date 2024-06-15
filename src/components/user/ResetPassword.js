import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearAuthError, resetPassword } from '../../actions/userActions'

const ResetPassword = () => {
    const [password,setPassword]=useState('')
    const [confirmPassword,setconfirmPassword]=useState('')
    const navigater=useNavigate()
    const dispatch=useDispatch()
    const {isAuthenticated,loading,error}=useSelector(state=>state.authState)
    const {token}=useParams()
      
const handleSubmit=(e)=>{
    e.preventDefault()
    const formdata=new FormData()

    formdata.append('password',password)
    formdata.append('confirmPassword',confirmPassword)
    formdata.append('token',token)
    dispatch(resetPassword(formdata))
}

    useEffect(() => {
        if (isAuthenticated) {
          toast("new Password Has Chaged..!!", {
            type: "success",
            
          });
          navigater('/myProfile')
          return
        }
        if (error) {
          toast(error, {
            type: "error",
            onOpen:()=>{
                dispatch(clearAuthError())
            }
          });
          return
        }
      }, [isAuthenticated, error,dispatch,navigater]);

 
  return (
    <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={handleSubmit}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                          value={password}
                          onChange={e=>setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={e=>setconfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3" disabled={loading}>
                        Set Password
                    </button>

                </form>
            </div>
        </div>
  )
}

export default ResetPassword
