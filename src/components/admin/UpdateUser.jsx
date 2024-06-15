import React, { Fragment, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearError,
 clearUserUpdated
} from "../../slices/userSlice";
import { getUser, updateUser } from "../../actions/userActions";

const UpdateProduct = () => {
  const {
    isUserUpdated = null,
    error = null,
    user ={},
  } = useSelector((state) => state.userState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    
    dispatch(updateUser(id, formData));
  };

  useEffect(() => {
    if (isUserUpdated) {
      toast("User updated succeess.", {
        type:'success',
        onOpen: () => dispatch(clearUserUpdated()),
      });

    }
    if (error) {
      toast(error, {
        type:'error',
        onOpen: () => dispatch(clearError()),
      });
    }
    dispatch(getUser(id));
  }, [error, isUserUpdated, id, dispatch]);

  useEffect(() => {
    if (user._id) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);


  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>
        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <form
              onSubmit={submitHandler}
              className="shadow-lg"
              encType="multipart/form-data"
            >
              <h1 className="mb-4">New Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Email_field">Email</label>
                <input
                  type="text"
                  id="Email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

             {
             user.role ==='user'?
             <div className="form-group">
                <label htmlFor="Role_field">Role</label>
                <select
                  className="form-control"
                  id="Role_field"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                    <option value='admin'>admin</option>
                    <option value='user'>user</option>
                </select>
              </div>:null
}

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
