//@ts-nocheck
"use client";
import React, { useState } from "react";
// import * as XLSX from "xlsx";
import { DialogDemo } from "../dialog";
import { LoadingService } from "../../../utils/LoadingService";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import crawlApi from "../../../apis";
type PhatNguoiProps = {};

const PhatNguoi: React.FC<PhatNguoiProps> = () => {
  const [isShowDialog, setIsShowDialog] = useState(false);

  // const [jsonData, setJsonData] = useState(null);
  // const [list, setList] = useState([]);
  //   const handleFileUpload = (event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();

  //       reader.onload = (e) => {
  //         const data = e.target.result;
  //         const workbook = XLSX.read(data, { type: "binary" });

  //         const sheetName = workbook.SheetNames[0];
  //         const worksheet = workbook.Sheets[sheetName];
  //         console.log(workbook);

  //         const dataJson = XLSX.utils.sheet_to_json(worksheet);

  //         console.log(dataJson);
  //       };

  //       reader.readAsBinaryString(file);
  //     }
  //   };
  const [bienSo, setBienSo] = useState("");
  const [jsxContent, setJsxContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  // const regex = /(\d{2}[A-Za-z])/;
  // const resetData = ()=>{
  //   setList([])
  // }
  const handleSubmit = async () => {
    // resetData()
    // LoadingService.start()
    setIsLoading(true);
    try {
      const list = bienSo.replaceAll(/\s+/g, "").split(/[,;]/);
      const danhSachBien = [];
      for (const plate of list) {
        const data = await crawlApi.getPhatNguoi({ licenseNumber: plate });
        if (data.data.violations !== null) {
          danhSachBien.push(data.data.violations[0]);
        }
        // danhSachBien.push(plate + "\n" + data.data);
      }
      // setList(danhSachBien);
      setResult(danhSachBien);
      // renderResult(danhSachBien);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      // LoadingService.stop()
      if (error?.response?.status === 401) {
        setIsShowDialog(true);
      }
    }
    setIsLoading(false);

    // LoadingService.stop()
  };

  // console.log(list[0]?.split("\n")[0].replace(/(\d{2}[A-Z])/, '$1-').replace(/(\d{2})(\d{2})$/, '$1.$2'))
  return (
    <div className="min-w-fit w-1/2 mx-auto ">
      <DialogDemo isShowDialog={isShowDialog} />
      <div className="mt-10 ">
        <InputText
          className="w-full"
          onChange={(e) => setBienSo(e.target.value)}
          placeholder="Không cần nhập các kí tự đặc biệt như . - "
        />
        <p className="text-[14px] text-gray-500 my-2">
          Nhập vào biển số xe hợp lệ, ví dụ: 20C11770. Các biển số xe cách nhau bằng dấu , hoặc{" "}
          <Button className="!text-sm !h-auto !p-2 !align-baseline">Import excel</Button>
        </p>
      </div>
      <Button
        label={isLoading ? "Đang tra cứu" : "Tra cứu"}
        loading={isLoading}
        type="button"
        onClick={handleSubmit}
        className="!mt-3 w-auto !mx-auto !flex"
      ></Button>
      <div>
        {result.length ? (
          result.map((item) => {
            return (
              <div className="border-b border-black py-5">
                <div className="flex my-3  flex-wrap">
                  <div className="text-md font-[600] basis-1/3">Biển kiểm soát</div>
                  <div className="flex-1 text-md">{item.licenseNumber}</div>
                </div>
                <div className="flex my-3  flex-wrap">
                  <div className="text-md font-[600] basis-1/3">Màu biển</div>
                  <div className="flex-1 text-md">{item.specs}</div>
                </div>
                <div className="flex my-3  flex-wrap">
                  <div className="text-md font-[600] basis-1/3">Loại phương tiện</div>
                  <div className="flex-1 text-md">{item.vehicleType}</div>
                </div>
                <div className="flex my-3  flex-wrap">
                  <div className="text-md font-[600] basis-1/3">Thời gian vi phạm</div>
                  <div className="flex-1 text-md">{item.violationTime}</div>
                </div>
                <div className="flex my-3  flex-wrap">
                  <div className="text-md font-[600] basis-1/3">Địa điểm vi phạm</div>
                  <div className="flex-1 text-md">{item.violationAddress}</div>
                </div>
                <div className="flex my-3  flex-wrap">
                  <div className="text-md font-[600] basis-1/3">Hành vi vi phạm</div>
                  <div className="flex-1 text-md">{item.behavior}</div>
                </div>
                <div className="flex my-3  flex-wrap">
                  <div className="text-md font-[600] basis-1/3">Trạng thái</div>
                  <div className="flex-1 text-md ">
                    <span className="text-danger badge">{item.status}</span>
                  </div>
                </div>
                <div className="flex my-3  flex-wrap">
                  <div className="text-md font-[600] basis-1/3">Đơn vị phát hiện vi phạm</div>
                  <div className="flex-1 text-md">{item.provider}</div>
                </div>

                <div className="flex my-3  flex-wrap">
                  <div className="text-md font-[600]">Nơi giải quyết vụ việc</div>
                </div>
                <div className="flex my-3 flex-wrap">
                  <div className="text-md whitespace-pre-wrap">{item.contactAddress}</div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-md font-semibold text-[#ff0000] mt-5">Không tìm thấy kết quả!</p>
        )}
      </div>
    </div>
  );
};

export default PhatNguoi;
