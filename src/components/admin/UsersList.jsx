import React, { Fragment, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import {
  deleteUser,
  updateUser,
  getAllUsers,
  getUser,
} from "../../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import {
  clearError,
  clearUserDeleted,
  clearUserUpdated,
} from "../../slices/userSlice";

const UsersList = () => {
  const {
    users = [],
    user = [],
    loading = true,
    error = null,
    isUserUpdated = false,
    isUserDeleted = false,
  } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const handleDelete = (e, id) => {
    e.target.disabled = true;
    const data = id;
    console.log(id);
    dispatch(deleteUser(id));

  };

  useEffect(() => {
    if (error) {
      toast(error, {
        type:'error',
        onOpen: () => dispatch(clearError()),
      });
      return;
    }
    if (isUserDeleted) {
      toast("User Deleted Success", {
        type:'success',

        onOpen: () => dispatch(clearUserDeleted()),
      });
      return;
    }
    dispatch(getAllUsers);
  }, [dispatch, error, isUserDeleted]);

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
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
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

    if (users.length > 0) {
      users.forEach((user) =>
        Data.rows.push({
          id: user._id,
          name: user.name,
          role: user.role,
          email: user.email,
          actions: (
            <Fragment>
              <Link to={`/admin/user/${user._id}`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
             
              <button
                className="btn btn-primary ml-4 "
                onClick={(e) => handleDelete(e, user._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
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
          <h1 className="my-4">UserS List</h1>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setData()}
              striped
              bordered
              hover
              className="px-3"
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
