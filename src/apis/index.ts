import axios from "axios";
import _axios from "../axios";
import {
  apiCuongCheThue,
  apiDanhSachCQT,
  apiDanhSachChiNhanh,
  apiDanhSachCongTyLienQuan,
  apiDanhSachNguoiLienQuan,
  apiLogin,
  apiPhatNguoi,
  apiRuiRoThue,
  apiTaiSan,
  apiThayDoiDKKD,
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
const getPhatNguoi = (input: any) => {
  return handleApiRequest(() => _axios.post(apiPhatNguoi, input));
};
const getCuongCheThue = (input: any) => {
  return handleApiRequest(() => _axios.post(apiCuongCheThue, input));
};
const getRuiRoThue = (input: any) => {
  return handleApiRequest(() => _axios.post(apiRuiRoThue, input));
};
const getDanhSachCQT = () => {
  return fetch("/listdmcqt.html").then((r) => r.json().then((data) => data));
};

const getThayDoiDKKD = (input: any) => {
  return handleApiRequest(() => _axios.post(apiThayDoiDKKD, input));
};
const crawlApi = {
  login,
  getDanhSachChiNhanh,
  getDanhSachNguoiLienQuan,
  getDanhSachCongTyLienQuan,
  getTaiSan,
  getPhatNguoi,
  getCuongCheThue,
  getRuiRoThue,
  getDanhSachCQT,
  getThayDoiDKKD,
};

export default crawlApi;
