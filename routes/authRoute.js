import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getAllUsersController,
  getWishlistController,
  deleteWishlistController,
  addWishlistController,
  getSingleWishlistController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//forgot  password
router.post("/forgot-password", forgotPasswordController);

//test route
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth User
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected route auth  Admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

// all users
router.get("/users", requireSignIn, isAdmin, getAllUsersController);
export default router;

// add wishlist
router.post("/add-wishlist/:prodId", requireSignIn, addWishlistController);
// // wishlist
router.delete(
  "/delete-wishlist/:prodId",
  requireSignIn,
  deleteWishlistController
);
// //all wishlist
router.get("/allwishlist", requireSignIn, getWishlistController);

// get single wishlist
router.get("/wishlist/:prodId", requireSignIn, getSingleWishlistController);
