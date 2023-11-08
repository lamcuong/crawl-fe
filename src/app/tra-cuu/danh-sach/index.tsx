//@ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingService } from "../../../utils/LoadingService";
import { InputText } from "primereact/inputtext";
import TableComponent from "../components/Table";
import { Button } from "primereact/button";
import { DialogDemo } from "../components/LoginDialog";

import crawlApi from "../../../apis";
import moment from "moment";
import { Link } from "react-router-dom";
import { RadioButton } from "primereact/radiobutton";
import DetailDialog from "../components/DetailDialog";
import { Dropdown } from "primereact/dropdown";

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
    render: (text, record, index) => <p>{text.split(" ")[0]}</p>,
    align: "left",
  },
  {
    title: "Nội Dung Thay Đổi",
    dataIndex: "file",
    key: "file",
    render: (text, record, index) => (
      <div className="text-center">
        <Link to={text} target="_blank">
          <Button>
            <i className="pi pi-file-pdf" />
          </Button>
        </Link>
      </div>
    ),
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
    title: "CCCD/MST",
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
    title: "Tên Cty",
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
  // {
  //   content: "Nợ Hải Quan",
  //   result: "",
  //   time: "",
  //   amount: "",
  //   monthCount: "",
  //   historyResult: "",
  //   detailResult: "",
  // },
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
const TraCuu: React.FC<RpaProps> = () => {
  const [visible, setVisible] = useState(false);
  const [detailResult, setDetailResult] = useState(null);
  const [dialogName, setDialogName] = useState("");
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
    },
    {
      title: "Số Tiền Nợ",
      key: "totalMoney",
      dataIndex: "totalMoney",
      align: "left",
    },
    {
      title: "Số Tháng Nợ",
      key: "totalMonth",
      dataIndex: "totalMonth",
      align: "left",
    },
    // {
    //   title: "Kết Quả Lịch Sử Trong Vòng 1 Năm",
    //   key: "historyResult",
    //   dataIndex: "historyResult",
    //   align: "left",
    // },
    {
      title: "Kết Quả Chi Tiết",
      key: "detailResult",
      dataIndex: "detailResult",
      render: (text, record, index) => {
        return record.result === "Có" ? (
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
    cqtTinh: "",
    cqtQuanLy: "",
  };
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
  const [cqtTinhOptions, setCqtTinhOptions] = useState([]);
  const [cqtQuanLyOptions, setCqtQuanLyOptions] = useState([]);
  useEffect(() => {
    crawlApi.getDanhSachCQT().then((r) => {
      const options = [{ code: "*", name: "Chọn cơ quan thuế" }];
      r?.listCqts?.forEach((item) => {
        if (item?.cap_cqt === "C") {
          options.push({ code: item.ma, name: item.ten });
        }
      });
      setCqtTinhOptions(options);
    });
  }, []);
  useEffect(() => {
    if (valueCQT.cqtTinh.code) {
      crawlApi.getDanhSachCQT(valueCQT.cqtTinh.code).then((r) => {
        const options = [];
        r?.listCqts?.forEach((item) => {
          options.push({ code: item.ma, name: item.ten });
        });
        setCqtQuanLyOptions(options);
      });
    }
  }, [valueCQT.cqtTinh]);
  useEffect(() => {
    setValueCQT((prevState) => ({
      ...prevState,
      cqtQuanLy: cqtQuanLyOptions[0],
    }));
  }, [cqtQuanLyOptions]);
  const handleChangeNNT = (name, newValue) => {
    setValueNTT({ ...valueNNT, [name]: newValue });
  };
  const getDanhSachCongTyLienQuan = async () => {
    const congTyLienQuan = await crawlApi.getDanhSachCongTyLienQuan({ taxCode: valueNNT.taxCode });
    setDataDanhSachCongTyLienQuan(congTyLienQuan.data);
  };
  const resetData = () => {
    setDataDanhSachChiNhanh([]);
    setDataDanhSachCongTyLienQuan([]);
    setDataDanhSachNguoiLienQuan([]);
  };
  const getThongTinThue = async (fromDate: string) => {
    const _dataThongTinThue = [...dataThongTinThue];
    const cuongCheThue = await crawlApi.getCuongCheThue({
      taxCode: valueNNT.taxCode,
      loaiThongBao: "hgtsd",
      fromDate: fromDate,
      toDate: moment().format("DD/MM/YYYY"),
    });

    _dataThongTinThue[0].result = cuongCheThue.data.taxsEnforceResult.length ? "Có" : "Không";
    _dataThongTinThue[0].time = cuongCheThue.data.taxsEnforceResult[0]?.ngayThongBao || "";
    _dataThongTinThue[0].detailResult = cuongCheThue.data;

    if (valueCQT?.cqtTinh?.code) {
      const ruiRoThue = await crawlApi.getRuiRoThue({
        taxCode: valueNNT.taxCode,
        cqtTinh: valueCQT?.cqtTinh?.code,
        cqtQuanLy: valueCQT?.cqtQuanLy?.code,
      });
      _dataThongTinThue[1].result = ruiRoThue.data.length ? "Có" : "Không";
      _dataThongTinThue[1].time = ruiRoThue.data[0]?.ngayQuyetDinh || "";
      _dataThongTinThue[1].detailResult = ruiRoThue.data[0];
    }

    const noBaoHiem = await crawlApi.getNoBaoHiem({
      taxCode: valueNNT.taxCode,
    });
    _dataThongTinThue[2].result = noBaoHiem?.data?.debtDetail.length ? "Có" : "Không";
    _dataThongTinThue[2].totalMoney = noBaoHiem?.data?.totalMoney;
    _dataThongTinThue[2].totalMonth = noBaoHiem?.data?.totalMonth;
    _dataThongTinThue[2].detailResult = noBaoHiem?.data?.debtDetail;

    setDataThongTinThue(_dataThongTinThue);
  };
  const traCuu = async () => {
    if (!valueCQT?.cqtQuanLy) {
      toast.error("Vui lòng chọn Cơ quan thuế quản lý", {
        autoClose: 1000,
      });
      return;
    }
    resetData();
    setIsLoading(true);
    try {
      const danhSachChiNhanh = await crawlApi.getDanhSachChiNhanh({
        taxCode: valueNNT.taxCode ? valueNNT.taxCode : null,
        cardId: valueNNT.cardId ? valueNNT.cardId : null,
      });
      setDataDanhSachChiNhanh(danhSachChiNhanh.data);

      const thayDoiGiayPhepDKKD = await crawlApi.getThayDoiDKKD({ taxCode: valueNNT.taxCode, loaiThongBao: "AMEND" });
      setDataThayDoiGiayPhepDKKD(thayDoiGiayPhepDKKD.data);
      const gpkdNgayCap = danhSachChiNhanh.data[0].thongTinChiTiet.gpkdngayCap.split(" - ")[1];

      const danhSachNguoiLienQuan = await crawlApi.getDanhSachNguoiLienQuan({
        taxCode: valueNNT.taxCode,
        taxCodes: [],
      });

      setDataDanhSachNguoiLienQuan(danhSachNguoiLienQuan.data);

      await getDanhSachCongTyLienQuan();
      if (valueNNT.taxCode) {
        await getThongTinThue(gpkdNgayCap);
      }
    } catch (error) {
      console.log("123", error);

      setIsLoading(false);
      if (error?.response?.status === 401) {
        setIsShowDialog(true);
      } else {
        toast.error("Lỗi hệ thống, Vui lòng thử lại");
      }
    }
    setIsLoading(false);
  };
  const handleSearchTypeChange = (e) => {
    setValueNTT(initialValue);
    setSearchType(e.target.value);
  };

  return (
    <div className="flex gap-10 justify-center  flex-col">
      <DetailDialog content={detailResult} dialogName={dialogName} visible={visible} setVisible={setVisible} />
      <DialogDemo isShowDialog={isShowDialog} setIsShowDialog={setIsShowDialog} />
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
            Tra cứu theo mã số thuế/Số đăng ký kinh doanh
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
            Tra cứu theo CMND/CCCD
          </label>
        </div>
      </div>
      <div className="w-1/2 lg:w-1/3 flex flex-col mx-auto gap-2">
        {searchType === "taxCode" ? (
          <>
            <div className="flex gap-2">
              <Dropdown
                value={valueCQT.cqtTinh}
                options={cqtTinhOptions}
                onChange={(e) => {
                  setValueCQT((prevState) => ({
                    ...prevState,
                    cqtTinh: e.value,
                  }));
                }}
                optionLabel="name"
                placeholder="Chọn cơ quan thuế"
                className="w-full md:w-14rem overflow-hidden"
              />
              <Dropdown
                value={valueCQT.cqtQuanLy}
                onChange={(e) =>
                  setValueCQT((prevState) => ({
                    ...prevState,
                    cqtQuanLy: e.value,
                  }))
                }
                options={cqtQuanLyOptions}
                optionLabel="name"
                className={`w-full md:w-14rem overflow-hidden `}
              />
            </div>
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
            placeholder="CCCD/CMND"
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
          onClick={traCuu}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
        <TableComponent
          pagination={false}
          className="col-span-full"
          title="Thông Tin Về Thuế & Nghĩa Vụ Khác"
          columns={thongTinVeThue}
          data={dataThongTinThue}
        />
        <TableComponent title="Thay đổi giấy phép ĐKKD" columns={thayDoiGiayPhepDKKD} data={dataThayDoiGiayPhepDKKD} />
        <TableComponent
          title="Danh sách người liên quan"
          columns={danhSachNguoiLienQuan}
          data={dataDanhSachNguoiLienQuan}
        />

        <TableComponent
          className="col-span-full "
          title="Danh sách Công ty liên quan của Người Liên Quan"
          columns={danhSachCongTyLienQuan}
          data={dataDanhSachCongTyLienQuan}
        />
        <TableComponent
          className="col-span-full"
          title="Danh sách chi nhánh"
          columns={danhSachChiNhanh}
          data={dataDanhSachChiNhanh}
        />
      </div>
    </div>
  );
};

export default TraCuu;
