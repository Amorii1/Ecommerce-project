import { Request, Response } from "express";
import {
  okRes,
  errRes,
  getOTP,
  hashMyPassword,
  comparePassword,
} from "../../helpers/tools";
import * as jwt from "jsonwebtoken";
import config from "../../config";
import { Invoice } from "../../src/entity/Invoice";
import request = require("request");
import { Any } from "typeorm";
import { time } from "console";
import { decode } from 'punycode';
const ZC = require("zaincash");

const Secret = "$2y$10$xlGUesweJh93EosHlaqMFeHh2nTOGxnGKILKCQvlSgKfmhoHzF12G";
const MerchantId = "5dac4a31c98a8254092da3d8";
const Msisdn = "9647835077880";
const initUrl = "https://test.zaincash.iq/transaction/init";
const requestUrl = "https://test.zaincash.iq/transaction/pay?id=";

export default class MethodController {
  static async zcPayment(req, res): Promise<object> {
    const time = Date.now();
    const data = {
      amount: 5000, // The amount you need the customer to pay. 250 is the minimum.
      serviceType: "Amorii website", // This is a free text and it's will appear to the customer in the payment page.
      msisdn: "9647835077880", // The merchant wallet number in string form
      orderId: "12345ID", // Free text, you need to write your invoice id from your DB, U will use in the redirection
      redirectUrl:"http://localhost:3001/v1/redirect", // Your GET URL that ZC will redirect to after the payment got completed
      iat: time, // Time for the JWT token
      exp: time + 60 * 60 * 4, // Time for the JWT token
    };
    const token = jwt.sign(data, Secret); // Create the token

    const postData = {
      token: token,
      merchantId: MerchantId,
      lang: "ar", // ZC support 3 languages ar, en, ku
    };

    const requestOptions = {
      uri: initUrl,
      body: JSON.stringify(postData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    request(requestOptions, function (error, response) {
        if(error) return res.send(error)
        //  Getting the operation id
          const OperationId = JSON.parse(response.body).id; // The id will look like 5e4d7ff765742b77601c6566
        // You can redirect to the page using the below code 
        res.writeHead(302, {
          'Location': requestUrl + OperationId
        });
        res.end();
        res.send(OperationId);
        console.log(OperationId);
        
        // Or you can create send the requestUrl + OperationId to the front end dev
    });

     return res;
  }
  /**
   *
   * @param req
   * @param res
   */
  static async redirect(req, res): Promise<object> {
    const token = req.body.token;
    if (token) {
      try {
        var decoded: any;
        decoded = jwt.verify(token, Secret);
      } catch (err) {
        // err
        return errRes(res,err)
      }
      if (decoded.status == "success") {
        // Do whatever you like
        return okRes(res,{status:decoded.status})
      } else {
        //  Do other things
        return okRes(res,{status:decoded.status})
      }
    }
  }
}
