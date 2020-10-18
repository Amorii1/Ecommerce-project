import { Request, Response } from "express";
import { okRes, errRes, getOTP, hashMyPassword,auth } from "../../helpers/tools";
import * as validate from "validate.js";
import validation from "../../helpers/validation.helper";
import { User } from "../../src/entity/User";
import PhoneFormat from "../../helpers/phone.helper";
import { error } from "console";
const jwt = require("jsonwebtoken");

/**
 *
 */
export default class UserController {
  /**
   *
   * @param req
   * @param res
   */
  static async register(req: Request, res: Response): Promise<object> {
    let user: any;
    let notValid = validate(req.body, validation.register());
    if (notValid) return errRes(res, notValid);

    let phoneObj = PhoneFormat.getAllFormats(req.body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `Phone ${req.body.phone} is not a valid`);

    try {
      user = await User.findOne({ where: { phone: req.body.phone } });
      if (user) return errRes(res, `Phone ${req.body.phone} already exists`);
    } catch (error) {
      return errRes(res, error);
    }

    let hash = await hashMyPassword(req.body.password);

    // TODO: send the SMS

    user = await User.create({
      ...req.body,
      password: hash,
      active: true,
      complete: false,
      otp: getOTP(),
    });
    await user.save();
    let token = jwt.sign({ id: user.id }, "shhh");
    return okRes(res, { userInfo: user, token });
  }
  /**
   * 
   * @param req 
   * @param res 
   */
  static async otpCheking(req: Request, res: Response): Promise<object> {
      let user: any;
    let authToken= auth(req,res);
      if (authToken=true){
      try {
        user = await User.findOne({ where: { phone: req.body.phone } });
        if (user.otp===req.body.otp) {
          // user = await User.findOne({ where: { name: req.body.name ,phone:req.body.phone,password:req.body.password } });
          user.complete=true;
          await user.save();
          return okRes(res,"OTP checked, registeration completed")
        }
        else
        { 
          // user = await User.findOne({ where: { name: req.body.name ,phone:req.body.phone,password:req.body.password } });
        user.otp=0;
        await user.save();
        return errRes(res, "wrong OTP entry");}
      }
       catch(error) { 
        return errRes(res, error);
      }
    }
    else
    return authToken;
  }
  /**
   * 
   * @param req 
   * @param res 
   */
  static async login(req: Request, res: Response): Promise<object>{
    let isNotValid = validate(req.body, validation.login());
    if (isNotValid) return errRes(res, isNotValid);

    let user: any;
    try {
      user = await User.findOne({
        where: { phone: req.body.phone, password: req.body.password },
        //should use bycrypt compare
      });
      if (user && user.complete === true)
        return okRes(res, ` you are sign in`);
        else if(user&&user.complete===false)
        return errRes(res,'complete your registeration please from OTP page.')
        else
        return errRes(res,error);
    } catch (error) {
      return errRes(res, error);
    }
  }
}
