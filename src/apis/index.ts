import _axios from "../axios";
import {
  apiDanhSachChiNhanh,
  apiDanhSachCongTyLienQuan,
  apiDanhSachNguoiLienQuan,
  apiLogin,
  apiPhatNguoi,
  apiTaiSan,
} from "../config";
import { handleApiRequest } from "./handle";

const login = (input: any) => {
  return handleApiRequest(() =>
    _axios.post(apiLogin, input, {
      headers: {
        Authorization: "Basic bXNiOm1zYjEyM2FBQCoj",
        "Content-Type": "application/json",
      },
    })
  );
};
const getDanhSachChiNhanh = (input: any) => {
  return handleApiRequest(() => _axios.post(apiDanhSachChiNhanh, input));
};
const getDanhSachNguoiLienQuan = (input: any) => {
  return handleApiRequest(() => _axios.post(apiDanhSachNguoiLienQuan, input));
};
const getDanhSachCongTyLienQuan = (input: any) => {
  return handleApiRequest(() => _axios.post(apiDanhSachCongTyLienQuan, input));
};
const getTaiSan = (input: any) => {
  return handleApiRequest(() => _axios.post(apiTaiSan, input));
};
const getPhatNguoi = (input:any)=>{
  return handleApiRequest(()=>_axios.post(apiPhatNguoi,input))
}
const crawlApi = {
  login,
  getDanhSachChiNhanh,
  getDanhSachNguoiLienQuan,
  getDanhSachCongTyLienQuan,
  getTaiSan,
  getPhatNguoi
};

export default crawlApi;
