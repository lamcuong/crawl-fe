import _axios from "../axios";
import {
  apiCuongCheThue,
  apiDanhSachCQT,
  apiDanhSachChiNhanh,
  apiDanhSachCongTyLienQuan,
  apiDanhSachNguoiLienQuan,
  apiLogin,
  apiNoBaoHiem,
  apiPhatNguoi,
  apiRuiRoThue,
  apiTaiSan,
  apiThayDoiDKKD,
  apiUploadPhatNguoi,
} from "../config";
import { handleApiRequest, handleApiRequestWithRetry } from "./handle";

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
  return handleApiRequestWithRetry(() => _axios.post(apiDanhSachChiNhanh, input));
};
const getDanhSachNguoiLienQuan = (input: any) => {
  return handleApiRequestWithRetry(() => _axios.post(apiDanhSachNguoiLienQuan, input));
};
const getDanhSachCongTyLienQuan = (input: any) => {
  return handleApiRequestWithRetry(() => _axios.post(apiDanhSachCongTyLienQuan, input));
};
const getTaiSan = (input: any) => {
  return handleApiRequestWithRetry(() => _axios.post(apiTaiSan, input));
};
const getPhatNguoi = (input: any) => {
  return handleApiRequestWithRetry(() => _axios.post(apiPhatNguoi, input));
};
const getUploadPhatNguoi = (input: any) => {
  return handleApiRequestWithRetry(() => _axios.post(apiUploadPhatNguoi, input));
};
const getCuongCheThue = (input: any) => {
  return handleApiRequestWithRetry(() => _axios.post(apiCuongCheThue, input));
};
const getRuiRoThue = (input: any) => {
  return handleApiRequestWithRetry(() => _axios.post(apiRuiRoThue, input));
};
const getDanhSachCQT = (input: any) => {
  const cqt = input ? `?cap=cc&byma=true&cqt=${input}` : "";
  return fetch(`/listdmcqt.html${cqt}`).then((r) => r.json().then((data) => data));
};
const getNoBaoHiem = (input: any) => {
  return handleApiRequestWithRetry(() => _axios.post(apiNoBaoHiem, input));
};
const getThayDoiDKKD = (input: any) => {
  return handleApiRequestWithRetry(() => _axios.post(apiThayDoiDKKD, input));
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
  getUploadPhatNguoi,
  getNoBaoHiem,
};

export default crawlApi;
