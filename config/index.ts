import { env } from "process";

require("dotenv").config();

let config: any;
export default config = {
  jwtSecret: process.env.JWT_SECRET || "shhh",
  zcSecret: process.env.ZC_SECRET || "",
  zcMsisdn: process.env.ZC_MSISDN || "",
  zcMerchant: process.env.ZC_MERCHANT || "",
  zcRedirect: process.env.ZC_REDIRECT || "",
  imageBbUploader: process.env.IMAGE_BB_UPLOADER || "",
};
