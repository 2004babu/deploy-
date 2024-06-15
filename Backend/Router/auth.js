const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  GetUserProfile,
  ChangePassword,
  updateProfile,
  getUser,
  UpdateUser,
  getAllUsers,
  deleteUser,
} = require("../Controller/authCotroller");
const {
  isAuthendicateUser,
  autherizeRole,
} = require("../MiddleWares/authendicate");
const router = express.Router();

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

router.route("/register").post(upload.single('avatar'),registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgetPassword);
router.route("/password/reset").post(resetPassword);
router.route("/password/change").put(isAuthendicateUser, ChangePassword);
router.route("/myprofile").get(isAuthendicateUser, GetUserProfile);
router.route("/update").put(isAuthendicateUser,upload.single('avatar'), updateProfile);

/////admin role
router
  .route("/admin/users")
  .get(isAuthendicateUser, autherizeRole("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthendicateUser, autherizeRole("admin"), getUser)
  .put(isAuthendicateUser, autherizeRole("admin"), UpdateUser)
  .delete(isAuthendicateUser, autherizeRole("admin"), deleteUser);

module.exports = router;
