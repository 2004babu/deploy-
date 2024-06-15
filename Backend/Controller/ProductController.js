const catchAsyncError = require("../MiddleWares/catchAsyncError");
const product = require("../model/ProductModel");
const ErrorHandler = require("../util/errorHandler");
const APIFeature = require("../util/APIFeatures");

/// get All Products -- /api/v1/products
exports.getproduct = catchAsyncError(async (req, res, next) => {
  const resPerPage = 3;
  // const apifeatures= new APIFeature(product.find(),req.query).search().filter().paginate(resPerPage)

  const buildQuery = () => {
    return new APIFeature(product.find(), req.query).search().filter();
  };

  let apiFeatures = buildQuery();

  const filteredProductsCount = await apiFeatures.query.countDocuments({});
  const totalProductsCount = await product.countDocuments({});

  let productsCount = totalProductsCount;

  if (filteredProductsCount !== totalProductsCount) {
    productsCount = filteredProductsCount;
  }

  apiFeatures = buildQuery().paginate(resPerPage);
  const allProducts = await apiFeatures.query;
  // const AllProducts = await buildQuery().paginate(resPerPage).query;

  res.status(200).json({
    success: true,
    count: productsCount,
    resPerPage,
    products: allProducts,
  });
});

// Create new Products --/api/v1/products/new
exports.newProduct = catchAsyncError(async (req, res) => {
  let images = [];

  let BASE_URL = process.env.BACKEND_URL;
  if(process.env.NODE_ENV === "production"){
      BASE_URL = `${req.protocol}://${req.get('host')}`
  }
  if (req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/products/${file.originalname}`;
      images.push({ image: url });
    });
  }
  req.body.images = images;

  req.body.user = req.user.id;
  const Product = await product.create(req.body);
  console.log(Product);
  res.status(201).json({
    success: true,
    Product,
  });
});

//GET SINGLE PRODUCT -/api/v1/products/:id

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const singleproduct = await product
    .findById(req.params.id)
    .populate("reviews.user", "name email");

  if (!singleproduct) {
    return next(new ErrorHandler("Product not found ", 404));
  }
  res.status(200).json({
    success: true,
    product: singleproduct,
  });
});

//UPDATE PRODUCT --/api/v1/products/:id

exports.updateProudct = catchAsyncError(async (req, res, next) => {
  let checke = await product.findById(req.params.id);


  let images = [];
  if (req.body.imageCleared === "false") {
    images =checke.images;
  }
  let BASE_URL = process.env.BACKEND_URL;
  if(process.env.NODE_ENV === "production"){
      BASE_URL = `${req.protocol}://${req.get('host')}`
  }
  if (req.files.length > 0) {
    let url;
    req.files.forEach((item) => {
      url = `${BASE_URL}/uploads/products/${item.originalname}`;
      images.push({ image: url });

    });
  }
  
  req.body.images = images;

  if (!checke) {
    return res.status(404).json({
      success: false,
      message: "Produc Not Found.!",
    });
  }
  const udatedItem = await product.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    success: true,
    Product: udatedItem,
  });
});
//////delete product
exports.deleProduct = catchAsyncError(async (req, res, next) => {
  const item = await product.findByIdAndDelete(req.params.id);
  if (!item) {
    return res.status(404).json({
      success: false,
      message: "ProductNot Found ...!",
    });
  }

  res.status(200).json({
    success: true,
    message: "deleted success",
    item,
  });
});

exports.getAdminProduct = catchAsyncError(async (req, res, next) => {
  const Products = await product.find({});

  res.status(200).json({
    success: true,
    Products,
  });
});
