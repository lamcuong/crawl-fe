import _axios from "../axios";
import {
  apiCuongCheThue,
  apiDanhSachCQT,
  apiDanhSachChiNhanh,
  apiDanhSachCongTyLienQuan,
  apiDanhSachDonViBHXH,
  apiDanhSachNguoiLienQuan,
  apiDanhSachTinhThanh,
  apiLogin,
  apiNoBaoHiem,
  apiPhatNguoi,
  apiRuiRoThue,
  apiTaiSan,
  apiThayDoiDKKD,
  apiUploadPhatNguoi,
} from "../config";
import { handleApiRequest, handleApiRequestWithMessage } from "./handle";

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
  return handleApiRequestWithMessage(() => _axios.post(apiTaiSan, input));
};
const getPhatNguoi = (input: any) => {
  return handleApiRequestWithMessage(() => _axios.post(apiPhatNguoi, input));
};
const getUploadPhatNguoi = (input: any) => {
  return handleApiRequestWithMessage(() => _axios.post(apiUploadPhatNguoi, input));
};
const getCuongCheThue = (input: any) => {
  return handleApiRequest(() => _axios.post(apiCuongCheThue, input));
};
const getRuiRoThue = (input: any) => {
  return handleApiRequest(() => _axios.post(apiRuiRoThue, input));
};
const getDanhSachCQT = (input?: any) => {
  const cqt = input ? `?cap=cc&byma=true&cqt=${input}` : "";
  return fetch(`/listdmcqt.html${cqt}`).then((r) => r.json().then((data) => data));
};
const getDanhSachTinhThanh = () => {
  return handleApiRequest(()=>_axios.get(apiDanhSachTinhThanh));
}
const getDanhSachDonViBHXH = (input: any) => {
  return handleApiRequest(()=>_axios.get(`${apiDanhSachDonViBHXH}?cityCode=${input}`))
}
const getNoBaoHiem = (input: any) => {
  return handleApiRequest(() => _axios.post(apiNoBaoHiem, input));
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
  getUploadPhatNguoi,
  getNoBaoHiem,
  getDanhSachTinhThanh,
  getDanhSachDonViBHXH
};

export default crawlApi;
