import * as express from "express";
const router = express.Router();
import userAuth from "../../middleware/app/userAuth";

import UserController from "../../controllers/app/user.controller";
import HomeController from "../../controllers/app/home.controller";
import MethodController from './../../controllers/app/method.controller';

// USER CONTROLLER
router.post("/register", UserController.register);
router.post("/otp", UserController.checkOTP);
router.post("/login", UserController.login);
router.post("/editUser",userAuth, UserController.editUser);
router.post("/forgotPassword", UserController.forgotPassword);
router.post("/newPassword", UserController.newPassword);
router.post("/invoice", userAuth, UserController.makeInvoice);

// HOME CONTROLLER products
router.get("/categories", HomeController.getCategories);
router.get("/products/:category", HomeController.getProducts);
router.get("/methods", HomeController.getMethods);
router.get("/invoices", userAuth, HomeController.getInvoices);

// METHOD CONTROLLER
router.post("/zcPayment",userAuth,MethodController.zcPayment);
router.get('redirect',userAuth,MethodController.redirect);

export default router;