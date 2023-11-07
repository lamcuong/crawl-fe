//@ts-nocheck
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingService } from "../../../utils/LoadingService";
import { InputText } from "primereact/inputtext";
import TableComponent from "../table";
import { Button } from "primereact/button";
import { DialogDemo } from "../dialog";
import crawlApi from "../../../apis";
import moment from "moment";
import { Link } from "react-router-dom";
// const danhSachCoDong: ColumnsType<DataType> = [
//   {
//     title: "STT",
//     dataIndex: "stt",
//     key: "stt",
//     render: (text, record, index) => <p>{index + 1}</p>,
//     align: "left",
//   },
//   {
//     title: "Tên",
//     dataIndex: "name",
//     key: "name",
//     align: "left",
//   },
//   {
//     title: "CCCD/MST",
//     dataIndex: "cardId",
//     key: "cardId",
//     align: "left",
//     render: (text) => <p className="break-all">{text}</p>,
//   },
//   {
//     title: "% Góp Vốn	",
//     key: "sex",
//     dataIndex: "sex",
//     align: "left",
//   },
//   {
//     title: "Chức Vụ	",
//     key: "birthday",
//     dataIndex: "birthday",
//     align: "left",
//   },
// ];
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
    key: "amount",
    dataIndex: "amount",
    align: "left",
  },
  {
    title: "Số Tháng Nợ",
    key: "monthCount",
    dataIndex: "monthCount",
    align: "left",
  },
  {
    title: "Kết Quả Lịch Sử Trong Vòng 1 Năm",
    key: "historyResult",
    dataIndex: "historyResult",
    align: "left",
  },
  {
    title: "Kết Quả Chi Tiết",
    key: "detailResult",
    dataIndex: "detailResult",
    align: "left",
  },
];
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
    title: "Liên quan với	",
    dataIndex: "nguoiLienQuan",
    key: "nguoiLienQuan",
    // render:(text,record)=>{
    //   console.log('tesx',record)
    //   return<div>{record.thongTinChiTiet.daiDienPL}</div>
    // },
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
  {
    content: "Nợ Hải Quan",
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
const TraCuu: React.FC<RpaProps> = () => {
  const [valueNNT, setValueNTT] = useState({
    taxCode: "",
    cardId: "",
  });

  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataDanhSachChiNhanh, setDataDanhSachChiNhanh] = useState([]);
  // const [dataDanhSachCoDong, setDataDanhSachCoDong] = useState([]);
  const [dataDanhSachNguoiLienQuan, setDataDanhSachNguoiLienQuan] = useState([]);
  const [dataDanhSachCongTyLienQuan, setDataDanhSachCongTyLienQuan] = useState([]);
  const [danhSachCqt, setDanhSachCqt] = useState([]);
  const [dataThayDoiGiayPhepDKKD, setDataThayDoiGiayPhepDKKD] = useState([]);
  const [dataThongTinThue, setDataThongTinThue] = useState(dataThongTinThueDefault);

  useEffect(() => {
    crawlApi.getDanhSachCQT().then((r) => {
      setDanhSachCqt(r.listCqts);
    });
  }, []);

  const handleChangeNNT = (name, newValue) => {
    setValueNTT({ ...valueNNT, [name]: newValue });
  };
  const getDanhSachCongTyLienQuan = async (danhSachNguoiLienQuan) => {
    const danhSachCongTyLienQuan = [];
    for (const nguoiLienQuan of danhSachNguoiLienQuan) {
      const congTyLienQuan = await crawlApi.getDanhSachCongTyLienQuan({ cardId: nguoiLienQuan.cardId });
      if (congTyLienQuan.data) {
        congTyLienQuan.data.forEach((item) => {
          danhSachCongTyLienQuan.push({ ...item, nguoiLienQuan: nguoiLienQuan.name });
        });
        // danhSachCongTyLienQuan.push([...congTyLienQuan.data]);
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
    setDataDanhSachCongTyLienQuan(danhSachCongTyLienQuan);
  };
  const resetData = () => {
    setDataDanhSachChiNhanh([]);
    // setDataDanhSachCoDong([]);
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

    _dataThongTinThue[0].result = cuongCheThue.data.listTaxEnforceResult.length ? "Có" : "Không";
    _dataThongTinThue[0].time = cuongCheThue.data.listTaxEnforceResult[0]?.ngayThongBao || "";

    const cqtQuanLy = danhSachCqt.find(
      (cqt) => cqt.ten.toLowerCase() === cuongCheThue.data.coQuanThueQuanLy?.toLowerCase()
    );
    const cqtTinh = danhSachCqt.find((i) => i?.cap_cqt === "C" && i?.ma.startsWith(cqtQuanLy?.ma.substring(0, 3)));

    if (cqtTinh) {
      const ruiRoThue = await crawlApi.getRuiRoThue({
        taxCode: valueNNT.taxCode,
        cqtTinh: cqtTinh?.ma,
        cqtQuanLy: cqtQuanLy?.ma,
      });
      _dataThongTinThue[1].result = ruiRoThue.data.length ? "Có" : "Không";
      _dataThongTinThue[1].time = ruiRoThue.data[0]?.ngayThongBao || "";
    }

    setDataThongTinThue(_dataThongTinThue);
  };
  const traCuu = async () => {
    // LoadingService.start();
    resetData();
    setIsLoading(true);
    try {
      // const danhSachChiNhanh = await handleApiRequest(apiDanhSachChiNhanh, {
      //   taxCode: valueNNT.taxCode ? valueNNT.taxCode : null,
      //   cardId: valueNNT.cardId ? valueNNT.cardId : null,
      // });

      const danhSachChiNhanh = await crawlApi.getDanhSachChiNhanh({
        taxCode: valueNNT.taxCode ? valueNNT.taxCode : null,
        cardId: valueNNT.cardId ? valueNNT.cardId : null,
      });
      setDataDanhSachChiNhanh(danhSachChiNhanh.data);

      const thayDoiGiayPhepDKKD = await crawlApi.getThayDoiDKKD({ taxCode: valueNNT.taxCode, loaiThongBao: "AMEND" });
      setDataThayDoiGiayPhepDKKD(thayDoiGiayPhepDKKD.data);
      const gpkdNgayCap = danhSachChiNhanh.data[0].thongTinChiTiet.gpkdngayCap.split(" - ")[1];

      const danhSachNguoiLienQuan = await crawlApi.getDanhSachNguoiLienQuan({ taxCode: valueNNT.taxCode });
      if (danhSachNguoiLienQuan.status === 500) {
        throw new Error("Lỗi hệ thống");
      }
      setDataDanhSachNguoiLienQuan(danhSachNguoiLienQuan.data);

      await getDanhSachCongTyLienQuan(danhSachNguoiLienQuan.data);
      if (valueNNT.taxCode) {
        await getThongTinThue(gpkdNgayCap);
      }
    } catch (error) {
      setIsLoading(false);
      // LoadingService.stop();
      if (error?.response?.status === 401) {
        setIsShowDialog(true);
      } else {
        toast.error("Lỗi hệ thống, Vui lòng thử lại");
      }
    }
    setIsLoading(false);
    // LoadingService.stop();
  };
  return (
    <div className="flex gap-10 justify-center  flex-col">
      <DialogDemo isShowDialog={isShowDialog} setIsShowDialog={setIsShowDialog} />

      <div className="w-1/2 lg:w-1/3 flex flex-col mx-auto">
        <InputText
          className="p-2"
          id="taxCode"
          placeholder="Mã số thuế"
          onChange={(e) => handleChangeNNT(e.target.name, e.target.value)}
          type="text"
          value={valueNNT.taxCode}
          name="taxCode"
        />

        {/* <InputText
          className="p-2 !mt-2"
          id="cardId"
          placeholder="Card ID"
          onChange={(e) => handleChangeNNT(e.target.name, e.target.value)}
          type="text"
          value={valueNNT.cardId}
          name="cardId"
        /> */}
        <Button
          type="button"
          className="!mt-3 w-auto !mx-auto"
          loading={isLoading}
          label={isLoading ? "Đang tra cứu" : "Tra cứu"}
          onClick={traCuu}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
        {/* <TableComponent
          title="Danh sách Cổ đông/Người góp vốn hiện tại"
          columns={danhSachCoDong}
          data={dataDanhSachCoDong}
        /> */}
        <TableComponent
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
