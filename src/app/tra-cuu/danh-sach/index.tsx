//@ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputText } from "primereact/inputtext";
import TableComponent from "../components/Table";
import { Button } from "primereact/button";
import { DialogLogin } from "../components/LoginDialog";

import crawlApi from "../../../apis";
import moment from "moment";
import { Link } from "react-router-dom";
import { RadioButton } from "primereact/radiobutton";
import DetailDialog from "../components/DetailDialog";
import CQT from "../components/CqtSelect";
import BHXH from "../components/BhxhSelect";
const thayDoiGiayPhepDKKD: ColumnsType<DataType> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    render: (text, record, index) => <p>{index + 1}</p>,
    align: "left",
  },
  {
    title: "Thời Gian Thay Đổi",
    dataIndex: "thoiGianThayDoi",
    key: "thoiGianThayDoi",
    render: (text, record, index) => <p>{text?.split(" ")?.[0]}</p>,
    align: "left",
  },
  {
    title: "Nội Dung Thay Đổi",
    dataIndex: "base64",
    key: "base64",
    render: (text, record, index) => {
      return (
        <div className="text-center">
          {/* <Link to={text} target="_blank"> */}
          <Button
            type="button"
            onClick={() => {
              const byteCharacters = atob(text);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], { type: "application/pdf" });

              const pdfUrl = URL.createObjectURL(blob);
              window.open(pdfUrl);
            }}
          >
            <i className="pi pi-file-pdf" />
          </Button>
          {/* </Link> */}
        </div>
      );
    },
    align: "left",
  },
];
const danhSachNguoiLienQuan = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    render: (text, record, index) => <p>{index + 1}</p>,
    align: "left",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: "CCCD",
    dataIndex: "cardId",
    key: "cardId",
    align: "left",
    render: (text) => <p className="break-all">{text}</p>,
  },
  {
    title: "Giới tính",
    key: "sex",
    dataIndex: "sex",
    align: "left",
  },
  {
    title: "Ngày sinh",
    key: "birthday",
    dataIndex: "birthday",
    align: "left",
  },
];
const danhSachCongTyLienQuan = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    render: (text, record, index) => {
      return <p>{index + 1}</p>;
    },
    align: "left",
  },
  {
    title: "Liên quan với",
    dataIndex: "nguoiLienQuan",
    key: "nguoiLienQuan",
    align: "left",
  },
  {
    title: "Tên công ty",
    dataIndex: "tenNNT",
    key: "tenNNT",
    align: "left",
  },
  {
    title: "MST	",
    dataIndex: "mst",
    key: "mst",
    align: "left",
    render: (text) => <p className="break-all">{text}</p>,
  },
  {
    title: "Năm thành lập",
    dataIndex: "thongTinChiTiet",
    key: "thongTinChiTiet",
    render: (text) => {
      return <p>{text?.gpkdngayCap.split(" - ")[1]}</p>;
    },
    align: "left",
  },
  {
    title: "Người đại diện pháp luật",
    dataIndex: ["thongTinChiTiet", "daiDienPL"],
    key: ["thongTinChiTiet", "daiDienPL"],
    align: "left",
  },
  {
    title: "Tên Giám Đốc",
    dataIndex: ["thongTinChiTiet", "giamDoc"],
    key: ["thongTinChiTiet", "giamDoc"],
    align: "left",
  },
  {
    title: "Tên Kế Toán Trưởng",
    dataIndex: ["thongTinChiTiet", "keToanTruong"],
    key: ["thongTinChiTiet", "keToanTruong"],
    align: "left",
  },
  {
    title: "CMND của người đại diện pháp luật",
    dataIndex: "soCMT",
    key: "soCMT",
    align: "left",
  },
  {
    title: "Ngành nghề kinh doanh chính",
    dataIndex: ["thongTinChiTiet", "tenNganhNgheKDChinh"],
    key: ["thongTinChiTiet", "tenNganhNgheKDChinh"],
    align: "left",
  },
  {
    title: "Địa chỉ trụ sở",
    dataIndex: ["thongTinChiTiet", "diaChiTruSo"],
    key: ["thongTinChiTiet", "diaChiTruSo"],
    align: "left",
  },
  {
    title: "Ngày thay đổi thông tin gần nhất",
    dataIndex: "ngayThayDoiTTGanNhat",
    key: "ngayThayDoiTTGanNhat",
    align: "left",
  },
  {
    title: "Tình Trạng Hoạt Động",
    dataIndex: "ghiChu",
    key: "ghiChu",
    align: "left",
  },
];
const danhSachChiNhanh: ColumnsType<DataType> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    render: (text, record, index) => <p>{index + 1}</p>,
    align: "left",
  },
  {
    title: "Tên CN",
    dataIndex: "tenNNT",
    key: "tenNNT",
    align: "left",
  },
  {
    title: "MST",
    dataIndex: "mst",
    key: "mst",
    align: "left",
    render: (text) => <p className="break-all">{text}</p>,
  },
  {
    title: "Số CMT/Thẻ căn cước",
    dataIndex: "soCMT",
    key: "soCMT",
    align: "left",
  },
  {
    title: "Năm thành lập",
    dataIndex: "thongTinChiTiet",
    key: "thongTinChiTiet",
    render: (text) => {
      return <p>{text?.gpkdngayCap.split(" - ")[1]}</p>;
    },
    align: "left",
  },
  {
    title: "Người đại diện pháp luật",
    dataIndex: ["thongTinChiTiet", "daiDienPL"],
    key: ["thongTinChiTiet", "daiDienPL"],
    align: "left",
  },
  {
    title: "Tên Giám Đốc",
    dataIndex: ["thongTinChiTiet", "giamDoc"],
    key: ["thongTinChiTiet", "giamDoc"],
    align: "left",
  },
  {
    title: "Tên Kế Toán Trưởng",
    dataIndex: ["thongTinChiTiet", "keToanTruong"],
    key: ["thongTinChiTiet", "keToanTruong"],
    align: "left",
  },
  {
    title: "Ngành nghề kinh doanh chính",
    dataIndex: ["thongTinChiTiet", "tenNganhNgheKDChinh"],
    key: ["thongTinChiTiet", "tenNganhNgheKDChinh"],
    align: "left",
  },
  {
    title: "Địa chỉ trụ sở",
    dataIndex: ["thongTinChiTiet", "diaChiTruSo"],
    key: ["thongTinChiTiet", "diaChiTruSo"],
    align: "left",
  },
  {
    title: "Ngày thay đổi thông tin gần nhất",
    dataIndex: "ngayThayDoiTTGanNhat",
    key: "ngayThayDoiTTGanNhat",
    align: "left",
  },
  {
    title: "Tình trạng hoạt động",
    key: "ghiChu",
    dataIndex: "ghiChu",
    align: "left",
  },
];

const TraCuu: React.FC<RpaProps> = () => {
  const [visible, setVisible] = useState(false);
  const [detailResult, setDetailResult] = useState(null);
  const [dialogName, setDialogName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dataThongTinThueDefault = [
    {
      content: "Cưỡng chế thuế",
      result: "",
      time: "",
      amount: "",
      monthCount: "",
      historyResult: "",
      detailResult: "",
    },
    {
      content: "Rủi ro cao về thuế",
      result: "",
      time: "",
      amount: "",
      monthCount: "",
      historyResult: "",
      detailResult: "",
    },
    {
      content: "Nợ bảo hiểm xã hội hiện hữu",
      result: "",
      time: "",
      amount: "",
      monthCount: "",
      historyResult: "",
      detailResult: "",
    },
  ];
  const thongTinVeThue = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => <p>{index + 1}</p>,
      align: "left",
    },
    {
      title: "Nội Dung",
      dataIndex: "content",
      key: "content",
      align: "left",
    },
    {
      title: "Kết Quả",
      dataIndex: "result",
      key: "result",
      align: "left",
      render: (text) => <p className="break-all">{text}</p>,
    },
    {
      title: "Khoảng Thời Gian Phát Sinh",
      key: "time",
      dataIndex: "time",
      align: "left",
      render: (text, record) => (record.result === "Có" ? <p>{text}</p> : null),
    },
    {
      title: "Số Tiền Nợ",
      key: "totalMoney",
      dataIndex: "totalMoney",
      align: "left",
      render: (text, record) => <p>{text && record.result === "Có" ? text.toLocaleString() : ""}</p>,
    },
    {
      title: "Số Tháng Nợ",
      key: "totalMonth",
      dataIndex: "totalMonth",
      align: "left",
      render: (text, record) => (record.result === "Có" ? <p>{text}</p> : null),
    },
    {
      title: "Kết Quả Chi Tiết",
      key: "detailResult",
      dataIndex: "detailResult",
      render: (text, record, index) => {
        return record.detailResult?.length ? (
          <div className="text-center">
            <Button
              onClick={() => {
                setDialogName(record.content);
                setDetailResult(text);
                setVisible(true);
              }}
            >
              <i className="pi pi-search" />
            </Button>
          </div>
        ) : null;
      },
      align: "left",
    },
  ];
  const initialValue = {
    taxCode: "",
    cardId: "",
    parentTaxCode: "",
  };
  const defaultValueCQT = {
    cqtTinh: { code: "", name: "" },
    cqtQuanLy: { code: "", name: "" },
  };

  const [error, setError] = useState(null);
  const [valueCQT, setValueCQT] = useState(defaultValueCQT);
  const [valueNNT, setValueNTT] = useState(initialValue);
  const [searchType, setSearchType] = useState("taxCode");
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataDanhSachChiNhanh, setDataDanhSachChiNhanh] = useState([]);
  const [dataDanhSachNguoiLienQuan, setDataDanhSachNguoiLienQuan] = useState([]);
  const [dataDanhSachCongTyLienQuan, setDataDanhSachCongTyLienQuan] = useState([]);
  const [dataThayDoiGiayPhepDKKD, setDataThayDoiGiayPhepDKKD] = useState([]);
  const [dataThongTinThue, setDataThongTinThue] = useState(dataThongTinThueDefault);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleChangeNNT = (name, newValue) => {
    setValueNTT({ ...valueNNT, [name]: newValue });
  };
  const resetData = () => {
    setDataDanhSachChiNhanh([]);
    setDataDanhSachCongTyLienQuan([]);
    setDataDanhSachNguoiLienQuan([]);
    setDataThayDoiGiayPhepDKKD([]);
    setDataThongTinThue(dataThongTinThueDefault);
    setError(null);
    setIsSubmitted(false);
  };
  const getThongTinThue = async (handleFunction: () => Promise) => {
    const _dataThongTinThue = [...dataThongTinThueDefault];

    const cuongCheThue = await handleFunction(() =>
      crawlApi.getCuongCheThue({
        taxCode: valueNNT.taxCode,
        loaiThongBao: "hgtsd",
        toDate: moment().format("DD/MM/YYYY"),
      })
    );
    _dataThongTinThue[0].result = cuongCheThue.data?.taxsEnforceResult.length ? "Có" : "Không";
    _dataThongTinThue[0].time =
      cuongCheThue.data?.taxsEnforceResult[cuongCheThue.data?.taxsEnforceResult?.length - 1]?.ngayThongBao || "";
    _dataThongTinThue[0].detailResult = cuongCheThue.data?.taxsEnforceResult;
    if (valueCQT?.cqtTinh?.code && valueCQT?.cqtTinh?.code !== "*") {
      const ruiRoThue = await handleFunction(() =>
        crawlApi.getRuiRoThue({
          taxCode: valueNNT.taxCode,
          cqtTinh: valueCQT?.cqtTinh?.code,
          cqtQuanLy: valueCQT?.cqtQuanLy?.code,
        })
      );
      _dataThongTinThue[1].result = ruiRoThue.data?.length ? "Có" : "Không";
      _dataThongTinThue[1].time = ruiRoThue.data?.[0]?.ngayQuyetDinh || "";
      _dataThongTinThue[1].detailResult = ruiRoThue.data;
    } else {
      _dataThongTinThue[1].result = "N/A";
    }

    const noBaoHiem = await handleFunction(() =>
      crawlApi.getNoBaoHiem({
        taxCode: valueNNT.taxCode,
      })
    );
    const previousMonth = moment().month() - 1;

    _dataThongTinThue[2].result = moment(noBaoHiem?.data?.dateDebt).month() === previousMonth ? "Có" : "Không";
    _dataThongTinThue[2].totalMoney = noBaoHiem?.data?.totalMoney;
    _dataThongTinThue[2].time = noBaoHiem?.data?.dateDebt ? moment(noBaoHiem?.data?.dateDebt).format("DD/MM/YYYY") : "";
    _dataThongTinThue[2].totalMonth = noBaoHiem?.data?.totalMonth;
    _dataThongTinThue[2].detailResult = noBaoHiem?.data?.debtDetail;

    setDataThongTinThue(_dataThongTinThue);
  };

  const handleCallApi = async (apiFunction, successCallback) => {
    try {
      const response = await apiFunction();
      if (response.code === 1008 || response.code === 1007) {
        setError(response.message);
      }
      if (successCallback) successCallback(response);
      return response;
    } catch (error) {
      setError(error.response?.data?.message);
      throw error;
    }
  };

  const handleRetryApi = async (apiFunction, successCallback) => {
    try {
      const response = await apiFunction();
      if (response.code === 1008 || response.code === 1007) {
        toast.error(response.message);
      }
      if (successCallback && response?.data?.length) successCallback(response);
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const search = async () => {
    setIsLoading(true);
    try {
      // danhSachChiNhanh
      await handleCallApi(
        () =>
          crawlApi.getDanhSachChiNhanh({
            taxCode: valueNNT.taxCode ? valueNNT.taxCode : null,
            cardId: valueNNT.cardId ? valueNNT.cardId : null,
          }),

        (danhSachChiNhanh) => {
          setDataDanhSachChiNhanh(danhSachChiNhanh.data);
        }
      );
      // thayDoiGiayPhepDKKD
      await handleCallApi(
        () => crawlApi.getThayDoiDKKD({ taxCode: valueNNT.taxCode, loaiThongBao: "AMEND,CHANTC" }),
        (thayDoiGiayPhepDKKD) => {
          setDataThayDoiGiayPhepDKKD(thayDoiGiayPhepDKKD.data);
        }
      );
      // danhSachNguoiLienQuan
      await handleCallApi(
        () =>
          crawlApi.getDanhSachNguoiLienQuan({
            taxCode: valueNNT.taxCode,
            taxCodes: [],
          }),
        (danhSachNguoiLienQuan) => {
          setDataDanhSachNguoiLienQuan(danhSachNguoiLienQuan.data);
        }
      );
      // danhSachCongTyLienQuan

      const dataDanhSachCongTyLienQuan = await crawlApi.getDanhSachCongTyLienQuan({ taxCode: valueNNT.taxCode });
      setDataDanhSachCongTyLienQuan(dataDanhSachCongTyLienQuan.data);
      await getThongTinThue(handleCallApi);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.status === 401) {
        setIsShowDialog(true);
      }
    }
  };
  const handleSubmit = async () => {
    if (!valueNNT.taxCode && searchType === "taxCode") {
      toast.error("Vui lòng nhập mã số thuế", {
        autoClose: 500,
      });
      return;
    } else if (!valueNNT.cardId && searchType === "cardId") {
      toast.error("Vui lòng nhập CCCD/CMND/Passport", {
        autoClose: 500,
      });
      return;
    }
    resetData();
    if (searchType === "taxCode") {
      await search();
    } else {
      setIsLoading(true);
      await handleCallApi(
        () =>
          crawlApi.getDanhSachChiNhanh({
            taxCode: valueNNT.taxCode ? valueNNT.taxCode : null,
            cardId: valueNNT.cardId ? valueNNT.cardId : null,
          }),
        (danhSachChiNhanh) => {
          setDataDanhSachChiNhanh(danhSachChiNhanh.data);
        }
      );
    }
    setIsSubmitted(true);

    setIsLoading(false);
  };
  useEffect(() => {
    if (error && isSubmitted && !isLoading) {
      toast.error(error);
    }
    if (isSubmitted && !isLoading && !error) {
      toast.success("Tra cứu thành công");
      setIsSuccess(true);
    }else {
      setIsSuccess(false)
    }
  }, [error, isLoading, isSubmitted]);
  const handleSearchTypeChange = (e) => {
    setValueNTT(initialValue);
    setSearchType(e.target.value);
  };
  return (
    <div className="flex gap-10 justify-center flex-col">
      <DetailDialog content={detailResult} dialogName={dialogName} visible={visible} setVisible={setVisible} />
      <DialogLogin isShowDialog={isShowDialog} setIsShowDialog={setIsShowDialog} />
      <div className="flex align-items-center justify-center gap-5">
        <div>
          <RadioButton
            inputId="taxCode"
            name="taxCode"
            value="taxCode"
            onChange={handleSearchTypeChange}
            checked={searchType === "taxCode"}
          />
          <label htmlFor="taxCode" className="ml-2">
            Tra cứu theo mã số thuế
          </label>
        </div>
        <div>
          <RadioButton
            inputId="cardId"
            name="cardId"
            value="cardId"
            onChange={handleSearchTypeChange}
            checked={searchType === "cardId"}
          />
          <label htmlFor="cardId" className="ml-2">
            Tra cứu theo CMND/CCCD/Passport
          </label>
        </div>
      </div>
      <div className="w-1/2 lg:w-2/5 flex flex-col mx-auto gap-2">
        {searchType === "taxCode" ? (
          <>
            <CQT valueCQT={valueCQT} setValueCQT={setValueCQT} />

            <InputText
              className="p-2"
              id="taxCode"
              placeholder="Mã số thuế"
              onChange={(e) => handleChangeNNT(e.target.name, e.target.value)}
              type="text"
              value={valueNNT.taxCode}
              name="taxCode"
            />
          </>
        ) : (
          <InputText
            className="p-2"
            id="cardId"
            placeholder="CCCD/CMND/Passport"
            onChange={(e) => handleChangeNNT(e.target.name, e.target.value)}
            type="text"
            value={valueNNT.cardId}
            name="cardId"
          />
        )}

        <Button
          type="button"
          className="!mt-3 w-auto !mx-auto"
          loading={isLoading}
          label={isLoading ? "Đang tra cứu" : "Tra cứu"}
          onClick={handleSubmit}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
        {searchType === "taxCode" && (
          <>
            <TableComponent
              isSuccess={isSuccess}
              retryFunc={() => getThongTinThue(handleRetryApi)}
              pagination={false}
              className="col-span-full"
              title="Thông Tin Về Thuế & Nghĩa Vụ Khác"
              columns={thongTinVeThue}
              data={isSubmitted && !error ? dataThongTinThue : dataThongTinThueDefault}
            />
            <TableComponent
              isSuccess={isSuccess}
              retryFunc={() =>
                handleRetryApi(
                  () => crawlApi.getThayDoiDKKD({ taxCode: valueNNT.taxCode, loaiThongBao: "AMEND,CHANTC" }),
                  (thayDoiGiayPhepDKKD) => {
                    setDataThayDoiGiayPhepDKKD(thayDoiGiayPhepDKKD.data);
                  }
                )
              }
              title="Thay đổi giấy phép ĐKKD"
              columns={thayDoiGiayPhepDKKD}
              data={isSubmitted && !error ? dataThayDoiGiayPhepDKKD : null}
            />
            <TableComponent
              isSuccess={isSuccess}
              retryFunc={() =>
                handleRetryApi(
                  () =>
                    crawlApi.getDanhSachNguoiLienQuan({
                      taxCode: valueNNT.taxCode,
                      taxCodes: [],
                    }),
                  (danhSachNguoiLienQuan) => {
                    setDataDanhSachNguoiLienQuan(danhSachNguoiLienQuan.data);
                  }
                )
              }
              title="Danh sách người liên quan"
              columns={danhSachNguoiLienQuan}
              data={isSubmitted && !error ? dataDanhSachNguoiLienQuan : null}
            />

            <TableComponent
              isSuccess={isSuccess}
              retryFunc={async () => {
                const dataDanhSachCongTyLienQuan = await crawlApi.getDanhSachCongTyLienQuan({
                  taxCode: valueNNT.taxCode,
                });
                setDataDanhSachCongTyLienQuan(dataDanhSachCongTyLienQuan.data);
              }}
              className="col-span-full "
              title="Danh sách Công ty liên quan của Người Liên Quan"
              columns={danhSachCongTyLienQuan}
              data={isSubmitted && !error ? dataDanhSachCongTyLienQuan : null}
            />
          </>
        )}
        <TableComponent
          isSuccess={isSuccess}
          retryFunc={() =>
            handleRetryApi(
              () =>
                crawlApi.getDanhSachChiNhanh({
                  taxCode: valueNNT.taxCode ? valueNNT.taxCode : null,
                  cardId: valueNNT.cardId ? valueNNT.cardId : null,
                }),

              (danhSachChiNhanh) => {
                setDataDanhSachChiNhanh(danhSachChiNhanh.data);
              }
            )
          }
          className="col-span-full"
          title="Danh sách chi nhánh"
          columns={danhSachChiNhanh}
          data={isSubmitted && !error ? dataDanhSachChiNhanh : null}
        />
      </div>
    </div>
  );
};

export default TraCuu;
