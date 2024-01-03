//@ts-nocheck
import React, { useEffect, useState } from "react";
import { DialogLogin } from "../components/LoginDialog";
import DetailDialog from "../components/DetailDialog";
import { Button } from "primereact/button";
import TableComponent from "../components/Table";
import moment from "moment";
import crawlApi from "../../../apis";
import { ToastContent, toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import BHXH from "../components/BhxhSelect";
import CQT from "../components/CqtSelect";
import { checkError } from "../../../utils";
import RetryDialog from "../components/RetryDialog";


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
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const isSuccess = isSubmitted && !isError & !error

  useEffect(() => {
    if (error && isSubmitted && !isLoading && !isError) {
      toast.error(error);
    }
    if (isSubmitted && !isLoading && !error && !isError) {
      toast.success("Tra cứu thành công");
    }
  }, [error, isError, isLoading, isSubmitted]);
  const getThongTinThue = async (handleFunction, retry?: boolean) => {
    const _dataThongTinThue = [...dataThongTinThue];

    const cuongCheThue = await handleFunction(() =>
      crawlApi.getCuongCheThue({
        taxCode,
        loaiThongBao: "hgtsd",
        toDate: moment().format("DD/MM/YYYY"),
        ...(retry ? { retry: true } : {}),
      })
    );
    if (cuongCheThue.data?.taxsEnforceResult?.length && !retry) {
      checkError(cuongCheThue.data.taxsEnforceResult, (isError) => setIsError(isError));
    }
    _dataThongTinThue[0].result = cuongCheThue.data?.taxsEnforceResult.length ? "Có" : "Không";
    _dataThongTinThue[0].time =
      cuongCheThue.data?.taxsEnforceResult[cuongCheThue.data?.taxsEnforceResult?.length - 1]?.ngayThongBao || "";
    _dataThongTinThue[0].detailResult = cuongCheThue.data?.taxsEnforceResult;

    if (valueCQT?.cqtTinh?.code && valueCQT?.cqtTinh?.code !== "*") {
      const ruiRoThue = await handleFunction(() =>
        crawlApi.getRuiRoThue({
          taxCode,
          cqtTinh: valueCQT?.cqtTinh?.code,
          cqtQuanLy: valueCQT?.cqtQuanLy?.code,
          ...(retry ? { retry: true } : {}),
        })
      );
      if (ruiRoThue?.data?.length && !retry) {
        checkError(ruiRoThue.data, (isError) => setIsError(isError));
      }
      _dataThongTinThue[1].result = ruiRoThue.data?.length ? "Có" : "Không";
      _dataThongTinThue[1].time = ruiRoThue.data?.[0]?.ngayQuyetDinh || "";
      _dataThongTinThue[1].detailResult = ruiRoThue.data;
    } else {
      _dataThongTinThue[1].result = "N/A";
    }

    const noBaoHiem = await handleFunction(() =>
      crawlApi.getNoBaoHiem({
        taxCode,
        ...(retry ? { retry: true } : {}),
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
      toast.error(error as ToastContent);
    }
  };
  const resetData = () => {
    setDataThongTinThue(dataThongTinThueDefault);
    setError(null);
    setIsSubmitted(false);
    setIsError(false)
  };
  const handleSubmit = async () => {
    if (!taxCode) {
      toast.error("Vui lòng nhập mã số thuế", {
        autoClose: 500,
      });
      return;
    }
    resetData();
    setIsLoading(true);
    try {
      await getThongTinThue(handleCallApi);
    } catch (error) {
      setIsLoading(false);
    }
    setIsSubmitted(true);
    setIsLoading(false);
  };
  const handleRetryApi = async (apiFunction, successCallback) => {
    try {
      const response = await apiFunction();
      if (successCallback) successCallback(response);
      return response;
    } catch (error) {}
  };
  const handleRetrySubmit = async () => {
    if (!taxCode) {
      toast.error("Vui lòng nhập mã số thuế", {
        autoClose: 500,
      });
      return;
    }
    try {
      await getThongTinThue(handleRetryApi, true);
    } catch (error) {}
  };
  return (
    <div className="flex gap-10 justify-center flex-col">
      <DetailDialog content={detailResult} dialogName={dialogName} visible={visible} setVisible={setVisible} />
      <DialogLogin isShowDialog={isShowDialog} setIsShowDialog={setIsShowDialog} />
      <RetryDialog isOpen={isError} retryFunction={handleRetrySubmit} />
      <div className="w-1/2 lg:w-2/5 flex flex-col mx-auto gap-2">
        <CQT valueCQT={valueCQT} setValueCQT={setValueCQT} />
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
          data={isSuccess ? dataThongTinThue : dataThongTinThueDefault}
        />
      </div>
    </div>
  );
};
export default ThueVaNghiaVuKhac;
