//@ts-nocheck
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingService } from "../../../utils/LoadingService";
import { InputText } from "primereact/inputtext";
import TableComponent from "../table";
import { Button } from "primereact/button";
import { DialogDemo } from "../dialog";
import crawlApi from "../../../apis";
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
    dataIndex: "ngayThayDoiTTGanNhat",
    key: "ngayThayDoiTTGanNhat",
    align: "left",
  },
  {
    title: "Nội Dung Thay Đổi",
    dataIndex: "content",
    key: "content",
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
    title: "% Góp Vốn	",
    key: "gopVon",
    dataIndex: "gopVon",
    align: "left",
  },
  {
    title: "Chức Vụ	",
    key: "chucVu",
    dataIndex: "chucVu",
    align: "left",
  },
];
const danhSachCongTyLienQuan = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    render: (text, record, index) => {
      console.log("1", index);
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
    title: "% Góp Vốn",
    dataIndex: "gopVon",
    key: "gopVon",
    align: "left",
  },
  {
    title: "Chức vụ",
    dataIndex: "chucVu",
    key: "chucVu",
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
    title: "Tình trạng hoạt động",
    key: "ghiChu",
    dataIndex: "ghiChu",
    align: "left",
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
  const traCuuNNT = async () => {
    LoadingService.start();
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

      const danhSachNguoiLienQuan = await crawlApi.getDanhSachNguoiLienQuan({ taxCode: valueNNT.taxCode });
      console.log("123123", danhSachNguoiLienQuan);
      if (danhSachNguoiLienQuan.status === 500) {
        throw new Error("Lỗi hệ thống");
      }
      setDataDanhSachNguoiLienQuan(danhSachNguoiLienQuan.data);

      await getDanhSachCongTyLienQuan(danhSachNguoiLienQuan.data);
    } catch (error) {
      setIsLoading(false);
      LoadingService.stop();
      if (error?.response?.status === 401) {
        setIsShowDialog(true);
      } else {
        toast.error("Lỗi hệ thống, Vui lòng thử lại");
      }
    }
    setIsLoading(false);
    LoadingService.stop();
  };

  // const handleApiRequest = async (apiUrl, requestData) => {
  //   try {
  //     const response = await _axios.post(`${baseURL}/${apiUrl}`, requestData);
  //     // if (response.data.status === 401) {
  //     //   throw new Error("Loi he thong");
  //     // }
  //     // if (response.data.status === 500) {
  //     //   throw new Error("Loi he thong");
  //     // }
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

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

        <InputText
          className="p-2 !mt-2"
          id="cardId"
          placeholder="Card ID"
          onChange={(e) => handleChangeNNT(e.target.name, e.target.value)}
          type="text"
          value={valueNNT.cardId}
          name="cardId"
        />
        <Button
          type="button"
          className="!mt-3 w-auto !mx-auto"
          loading={isLoading}
          label={isLoading ? "Đang tra cứu" : "Tra cứu"}
          onClick={traCuuNNT}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
        {/* <TableComponent
          title="Danh sách Cổ đông/Người góp vốn hiện tại"
          columns={danhSachCoDong}
          data={dataDanhSachCoDong}
        /> */}
        <TableComponent title="Danh sách chi nhánh" columns={danhSachChiNhanh} data={dataDanhSachChiNhanh} />

        <TableComponent title="Thay đổi giấy phép ĐKKD" columns={thayDoiGiayPhepDKKD} data={dataDanhSachChiNhanh} />
        <TableComponent
          title="Danh sách người liên quan"
          columns={danhSachNguoiLienQuan}
          data={dataDanhSachNguoiLienQuan}
        />
        <TableComponent
          title="Danh sách Công ty liên quan của Người Liên Quan"
          columns={danhSachCongTyLienQuan}
          data={dataDanhSachCongTyLienQuan}
        />
      </div>
    </div>
  );
};

export default TraCuu;
