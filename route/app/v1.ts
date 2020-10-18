import * as express from "express";
const router = express.Router();
import UserController from './../../controllers/app/user.controller';

//create V1 version
//// register
router.post("/register",UserController.register);
//// otp
router.post("/otp", UserController.otpCheking);
//// login
router.post("/login", UserController.login);

//// categories
//// category products
//// check out
//// invoices
//// methods
//// notifications

export default router;