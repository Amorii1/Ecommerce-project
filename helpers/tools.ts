const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/**
 *
 * @param res
 * @param err
 * @param statusCode
 */
const errRes = (res, err, statusCode = 400) => {
    let response = { status: false, err };//body
    res.statusCode = statusCode;//header
    return res.json(response);
  };
  /**
   *
   * @param res
   * @param data
   * @param statusCode
   */
  const okRes = (res, data, statusCode = 200) => {
    let response = { status: true, data };//body
    res.statusCode = statusCode;//header
    return res.json(response);
  };
  /**
   * 
   */
  const getOTP = () => Math.floor(1000 + Math.random() * 9000);
  /**
 *
 * @param {*} plainPassword
 */
const hashMyPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(plainPassword, salt);
  return password;
};

let auth=(req,res)=>{
  //get token from the request headers
  const token=req.headers.token;
  //if there's no token
  if(!token) return errRes(res,"Token is missing")
  //verify the token with the key
  //if ok -> next, if not -> return error
  try {
    const payload=jwt.verify(token,"shhh")
   return true;
  } catch (error) {
    return errRes(res,"Token is not valid!");
  }
  }
  
  export { errRes, okRes, getOTP,hashMyPassword,auth };