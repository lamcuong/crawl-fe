//@ts-nocheck
"use client";
import React, { useState, useRef } from "react";
import { DialogDemo } from "../components/LoginDialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import crawlApi from "../../../apis";
import { toast } from "react-toastify";
import { Dialog } from "primereact/dialog";

type PhatNguoiProps = {};

const PhatNguoi: React.FC<PhatNguoiProps> = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = async () => {
    if (selectedFile) {
      const input = new FormData();
      input.append("files", selectedFile);

      try {
        const response = await crawlApi.getUploadPhatNguoi(input);
        setResult(response.data);
        setSelectedFile(null);
      } catch (error) {
        setSelectedFile(null);
        throw error;
      }
    }
    ref.current?.clear();
  };
  const [isShowDialog, setIsShowDialog] = useState(false);

  const [bienSo, setBienSo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [visible, setVisible] = useState(false);
  const resetData = () => {
    setResult([])
  }
  const handleSubmit = async () => {
    resetData()
    setIsLoading(true);
    try {
      const list = bienSo.replaceAll(/\s+/g, "").split(/[,;]/);
      const danhSachBien = [];
      if (selectedFile) {
        await handleUpload();
      } else {
        for (const plate of list) {
          const data = await crawlApi.getPhatNguoi({ licenseNumber: plate });
          if (data.data.length) {
            danhSachBien.push(...data.data);
          }
        }
        setResult(danhSachBien);
      }

      setIsLoading(false);
      toast.success("Tra cứu thành công");
    } catch (error) {
      if (error?.response?.status === 401) {
        setIsShowDialog(true);
      } else {
        toast.error(error?.response?.data.ErrorMessage || error || `Lỗi hệ thống, Vui lòng thử lại`);
      }
    }
    setIsLoading(false);
  };
  const ref = useRef();
  return (
    <div className="min-w-fit w-1/2 mx-auto ">
      <DialogDemo isShowDialog={isShowDialog} />
      <Dialog
        dismissableMask
        header={"Thêm mới Import Excel"}
        visible={visible}
        position="top"
        style={{ width: "30vw" }}
        onHide={() => setVisible(false)}
        footer={
          <div>
            <a href="/file-mau-phat-nguoi.xlsx">
              <Button className="p-button-sm p-button-help mr-2" icon="pi pi-file-excel" label="Tải file mẫu"></Button>
            </a>
            <Button
              label={isLoading ? "Đang tra cứu" : "Tra cứu"}
              loading={isLoading}
              onClick={async () => {
                if (selectedFile) {
                  await handleSubmit();
                  setVisible(false);
                }
              }}
              className="p-button-sm mr-2"
            />
            <Button
              onClick={() => {
                setSelectedFile(null);
                setVisible(false);
              }}
              icon="pi pi-times"
              label="Đóng"
              className="p-button-sm p-button-raised p-button-text p-button-plain"
            ></Button>
          </div>
        }
      >
        <div>
          <label htmlFor="upload">Tải lên tệp tin</label>
          <input
            onChange={(e) => setSelectedFile(e.target.files[0])}
            id="upload"
            className="border p-2 block w-full"
            type="file"
          />
        </div>
      </Dialog>

      <div>
        <div className="flex gap-5">
          <InputText
            className="w-full"
            onChange={(e) => setBienSo(e.target.value)}
            placeholder="Nhập vào biển số xe hợp lệ, ví dụ: 20C11770. Các biển số xe cách nhau bằng dấu ,"
          />
          <Button onClick={() => setVisible(true)} className="!text-sm min-w-fit">
            Import Excel
          </Button>
        </div>
        <div className="text-[14px] text-gray-500 flex items-center">
          <p className="text-red-500"> Không cần nhập các kí tự đặc biệt như . - </p>
        </div>
      </div>
      <Button
        label={isLoading ? "Đang tra cứu" : "Tra cứu"}
        loading={isLoading}
        type="button"
        onClick={handleSubmit}
        className="!mt-3 w-auto !mx-auto !flex"
      ></Button>
      <div>
        {result.length
          ? result.map((item) => {
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
          : null}
      </div>
    </div>
  );
};

export default PhatNguoi;
