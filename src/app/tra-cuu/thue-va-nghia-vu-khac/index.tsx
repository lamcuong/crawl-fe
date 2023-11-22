import React, { useEffect, useState } from "react";
import { DialogDemo } from "../components/LoginDialog";
import DetailDialog from "../components/DetailDialog";
import { Button } from "primereact/button";
import TableComponent from "../components/Table";
import moment from "moment";
import crawlApi from "../../../apis";
import { ToastContent, toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

type ThueVaNghiaVuKhacProps = {};

const ThueVaNghiaVuKhac: React.FC<ThueVaNghiaVuKhacProps> = () => {
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
      totalMoney: "",
      totalMonth: "",
      historyResult: "",
      detailResult: "",
    },
  ];
  const thongTinVeThue = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text: any, record: any, index: any) => <p>{index + 1}</p>,
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
      render: (text: any) => <p className="break-all">{text}</p>,
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
      render: (text: any) => <p>{text ? text.toLocaleString() : ""}</p>,
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
      render: (text: any, record: any, index: any) => {
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
  const defaultValueCQT = {
    cqtTinh: { code: "", name: "" },
    cqtQuanLy: { code: "", name: "" },
  };
  const [valueCQT, setValueCQT] = useState(defaultValueCQT);
  const [dataThongTinThue, setDataThongTinThue] = useState(dataThongTinThueDefault);
  const [detailResult, setDetailResult] = useState(null);
  const [dialogName, setDialogName] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [visible, setVisible] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cqtTinhOptions, setCqtTinhOptions] = useState([]);
  const [cqtQuanLyOptions, setCqtQuanLyOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    crawlApi.getDanhSachCQT().then((r) => {
      const options: any = [{ code: "*", name: "Chọn cơ quan thuế" }];
      r?.listCqts?.forEach((item: any) => {
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
        const options: any = [];
        r?.listCqts?.forEach((item: any) => {
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

  useEffect(() => {
    if (error && !isLoading) {
      toast.error(error);
      console.log("123", error);
    }
  }, [error, isLoading]);
  const getThongTinThue = async () => {
    const _dataThongTinThue = [...dataThongTinThue];

    const cuongCheThue = await handleCallApi(() =>
      crawlApi.getCuongCheThue({
        taxCode,
        loaiThongBao: "hgtsd",
        toDate: moment().format("DD/MM/YYYY"),
      })
    );
    _dataThongTinThue[0].result = cuongCheThue.data?.taxsEnforceResult.length ? "Có" : "Không";
    _dataThongTinThue[0].time =
      cuongCheThue.data?.taxsEnforceResult[cuongCheThue.data?.taxsEnforceResult?.length - 1]?.ngayThongBao || "";
    _dataThongTinThue[0].detailResult = cuongCheThue.data?.taxsEnforceResult;

    if (valueCQT?.cqtTinh?.code) {
      const ruiRoThue = await handleCallApi(() =>
        crawlApi.getRuiRoThue({
          taxCode,
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

    const noBaoHiem = await handleCallApi(() =>
      crawlApi.getNoBaoHiem({
        taxCode,
      })
    );

    const previousMonth = moment().month() - 1
    _dataThongTinThue[2].result = moment(noBaoHiem?.data?.dateDebt).month() === previousMonth ? "Có" : "Không"
    _dataThongTinThue[2].totalMoney = noBaoHiem?.data?.totalMoney;
    _dataThongTinThue[2].time = noBaoHiem?.data?.dateDebt ? moment(noBaoHiem?.data?.dateDebt).format("DD/MM/YYYY") : "";
    _dataThongTinThue[2].totalMonth = noBaoHiem?.data?.totalMonth;
    _dataThongTinThue[2].detailResult = noBaoHiem?.data?.debtDetail;
    setDataThongTinThue(_dataThongTinThue);
  };

  const handleCallApi = async (apiFunction: any, successCallback?: any) => {
    try {
      const response = await apiFunction();
      if (response.code === 1008 || response.code === 1007) {
        setError(response.message);
      }
      if (successCallback) successCallback(response);
      return response;
    } catch (error) {
      toast.error(error as ToastContent);
    }
  };
  const resetData = () => {
    setDataThongTinThue(dataThongTinThueDefault);
  };
  const handleSubmit = async () => {
    resetData();
    setIsLoading(true);
    try {
      await getThongTinThue();
    } catch (error) {
      setIsLoading(false);
    }

    setIsLoading(false);
  };
  return (
    <div className="flex gap-10 justify-center flex-col">
      <DetailDialog content={detailResult} dialogName={dialogName} visible={visible} setVisible={setVisible} />
      <DialogDemo isShowDialog={isShowDialog} setIsShowDialog={setIsShowDialog} />

      <div className="w-1/2 lg:w-2/5 flex flex-col mx-auto gap-2">
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
            filter={true}
            optionLabel="name"
            placeholder="Chọn cơ quan thuế"
            className="w-full overflow-hidden"
          />
          <Dropdown
            value={valueCQT.cqtQuanLy}
            options={cqtQuanLyOptions}
            onChange={(e) =>
              setValueCQT((prevState) => ({
                ...prevState,
                cqtQuanLy: e.value,
              }))
            }
            optionLabel="name"
            filter={true}
            className="w-full overflow-hidden"
          />
        </div>
        <InputText
          className="p-2"
          id="taxCode"
          placeholder="Mã số thuế"
          onChange={(e) => setTaxCode(e.target.value)}
          type="text"
          value={taxCode}
          name="taxCode"
        />
        <Button
          type="button"
          className="!mt-3 w-auto !mx-auto"
          loading={isLoading}
          label={isLoading ? "Đang tra cứu" : "Tra cứu"}
          onClick={handleSubmit}
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
      </div>
    </div>
  );
};

export default ThueVaNghiaVuKhac;
