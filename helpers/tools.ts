import * as bcrypt from "bcryptjs";
const accountSid = "AC27719b221fa9f1c808c07dd98a614297";
const authToken = "79eab7e154af22a2141ce754a2e13ba4";
import * as twilio from "twilio";
const client = twilio(accountSid, authToken);

/**
 *
 * @param res
 * @param err
 * @param statusCode
 */
const errRes = (res, err, statusCode = 400) => {
  let response = { status: false, err };
  res.statusCode = statusCode;
  return res.json(response);
};

/**
 *
 * @param res
 * @param data
 * @param statusCode
 */
const okRes = (res, data, statusCode = 200) => {
  let response = { status: true, data };
  res.statusCode = statusCode;
  return res.json(response);
};

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

/**
 *
 * @param {*} plainPassword
 */
const comparePassword = async (plainPassword, hash) =>
  await bcrypt.compare(plainPassword, hash);

const paginate = (p = 1, s = 10) => {
  let take = s;
  let skip = (p - 1) * take;
  return { take, skip };
};

const sendSMS = (body: string, to: string) => {
  client.messages
    .create({ body, from: "+14152363940", to })
    .then((message) => console.log(message.sid));
};

export {
  errRes,
  okRes,
  getOTP,
  hashMyPassword,
  comparePassword,
  paginate,
  sendSMS,
};
