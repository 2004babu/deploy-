import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Profile = () => {

    const {user} =useSelector(state=>state.authState)
    const createAt = new Date(user.createAt);
const formattedDate = createAt.toISOString().substring(0, 10);
  return (
    <div className="row justify-content-around mt-5 user-info">
    <div className="col-12 col-md-3">
        <figure className='avatar avatar-profile'>
            <img className="rounded-circle img-fluid" src={user.avatar} alt='profile avatar' />
        </figure>
        <Link to={'/myProfile/editProfile'} id="edit_profile" className="btn btn-primary btn-block my-5">
            Edit Profile
        </Link>
    </div>

    <div className="col-12 col-md-5">
         <h4>Full Name</h4>
         <p>{user.name}</p>

         <h4>Email Address</h4>
         <p>{user.email}</p>

         <h4>Joined</h4>
         <p>{formattedDate}</p>

         {/* <a  className="btn btn-danger btn-block mt-5">
            My Orders
        </a> */}

        <Link to={'/myProfile/update/password'} className="btn btn-primary btn-block mt-3">
            Change Password
        </Link>
    </div>
</div>
  )
}

export default Profile
