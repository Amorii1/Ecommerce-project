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
  
  export { errRes, okRes, getOTP };