import React, { Fragment, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productActions";
import { toast } from "react-toastify";
import {
  clearError,
  clearProductCreated,
  clearProductUpdated,
} from "../../slices/productSlice";

const UpdateProduct = () => {
  const {
    isProductUpdated = null,
    error = null,
    product ={},
  } = useSelector((state) => state.productState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");
  const [image, setImage] = useState([]);
  const [imageCleared, setImageCleared] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const onSetImage = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImage((old) => [...old, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("seller", seller);
    formData.append("category", category);
    image.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("imageCleared", imageCleared);
    dispatch(updateProduct(id, formData));
  };

  useEffect(() => {
    if (isProductUpdated) {
      toast("product updated succeess.", {
        type:'success',
        onOpen: () => dispatch(clearProductUpdated()),
      });
      setImage([]);
      setImageCleared(false)
    }
    if (error) {
      toast(error, {
        type:'error',
        onOpen: () => dispatch(clearError()),
      });
    }
    dispatch(getProduct(id));
  }, [error, isProductUpdated, id, dispatch]);

  useEffect(() => {
    if (product._id) {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setDescription(product.description);
      setSeller(product.seller);

      let image = [];

      product.images.forEach((images) => image.push(images.image));

    //   setImage(image);
      setImagePreview(image);
    }
  }, [product]);

  const handleromoveImage = (e) => {
    setImageCleared(true)
    setImage([]);
    setImagePreview([]);
  };
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
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  className="form-control"
                  id="category_field"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={seller}
                  onChange={(e) => setSeller(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Images</label>

                <div className="custom-file">
                  <input
                    type="file"
                    name="product_images"
                    className="custom-file-input"
                    id="customFile"
                    multiple
                    onChange={onSetImage}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>
                <span>
                  <i className="fa fa-trash" onClick={handleromoveImage}></i>
                </span>
                {imagePreview.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={` Preview  state ${index}`}
                    width="55"
                    height="52"
                    className="mt-3 mr-2"
                  />
                ))}
              </div>

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
