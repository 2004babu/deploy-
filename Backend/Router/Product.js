const express = require("express");
const {
  getproduct,
  newProduct,
  getSingleProduct,
  updateProudct,
  deleProduct,
  getAdminProduct,
} = require("../Controller/ProductController");
const router = express.Router();
const {
  isAuthendicateUser,
  autherizeRole,
} = require("../MiddleWares/authendicate");
const multer = require("multer");
const path = require("path");

/* 

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/user"));
    },
    filename:function (req, file, cb) {
        cb(null,file.originalname)
    }
  }),
});
*/
const uploads = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/products"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

router.route("/products").get(getproduct);
router
  .route("/products/new")
  .post(
    isAuthendicateUser,
    autherizeRole("admin"),
    uploads.array("images"),
    newProduct
  );
router
  .route("/products/:id")
  .get(getSingleProduct)
  .put(isAuthendicateUser,uploads.array('images'), autherizeRole("admin"), updateProudct)
  .delete(isAuthendicateUser, autherizeRole("admin"), deleProduct);

router
  .route("/admin/products")
  .get(isAuthendicateUser, autherizeRole("admin"), getAdminProduct);

module.exports = router;
