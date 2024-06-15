import React, { Fragment } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const SideBar = () => {
  const Navigate = useNavigate();
  return (
    <Fragment>
      <div className="sidebar-wrapper">
        <nav id="sidebar">
          <ul className="list-unstyled components">
            <li>
              <NavDropdown title={<i className="fa fa-Product">Products</i>}>
                <NavDropdown.Item onClick={() => Navigate("/admin/products")}>
                  <i className="fa fa-shopping-basket">All</i>
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => Navigate("/admin/products/new")}
                >
                  <i className="fa fa-plus">Create</i>
                </NavDropdown.Item>
              </NavDropdown>
            </li>

            <li>
              <Link to="/admin/orders">
                <i className="fa fa-shopping-basket"></i> Orders
              </Link>
            </li>
            <li>
              <Link to="/admin/users">
                <i className="fa fa-users"></i> Users
              </Link>
            </li>

            <li>
              <Link to="/admin/reviews">
                <i className="fa fa-users"></i> Reviews
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default SideBar;
