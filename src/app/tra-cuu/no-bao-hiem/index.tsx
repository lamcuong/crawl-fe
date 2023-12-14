//@ts-nocheck
import React, { useEffect, useState } from "react";
import { DialogLogin } from "../components/LoginDialog";
import DetailDialog from "../components/DetailDialog";
import { Button } from "primereact/button";
import moment from "moment";
import { ToastContent, toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import BHXH from "../components/BhxhSelect";
import { Dialog } from "primereact/dialog";
import crawlApi from "../../../apis";
import { apiExportBHXH, baseURL } from "../../../config";

type NoBaoHiemProps = {};
const statusOptions = [
  { value: 1, label: "Tất cả" },
  { value: 2, label: "Đã có mã số thuế" },
  { value: 3, label: "Chưa có mã số thuế" },
];
const NoBaoHiem: React.FC<NoBaoHiemProps> = () => {
  const initialValue = {
    maSothue: "",
    status: 1,
  };

  const [value, setValue] = useState(initialValue);
  const [visible, setVisible] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    if (error && isSubmitted && !isLoading) {
      toast.error(error);
    }
    if (isSubmitted && !isLoading && !error) {
      toast.success("Tra cứu thành công");
    }
  }, [error, isLoading, isSubmitted]);
  const handleUpload = async () => {
    setIsLoading(true)
    if (selectedFile) {
      const input = new FormData();
      input.append("files", selectedFile);
      try {
        await crawlApi.importBHXH(input);
        toast.success("Upload thành công");
        setSelectedFile(null);
      } catch (error) {
        setSelectedFile(null);
        toast.error(error?.response.data.message);
      }
    }
    setIsLoading(false)
  };
  const handleExportExcel = async () =>{
    window.open(`${baseURL}${apiExportBHXH}?${new URLSearchParams(value)}`)
  }
  return (
    <div className="flex gap-10 justify-center flex-col">
      <DialogLogin isShowDialog={isShowDialog} setIsShowDialog={setIsShowDialog} />
      <Dialog
        dismissableMask
        header={"Thêm mới Import Excel"}
        visible={visible}
        position="top"
        style={{ width: "30vw" }}
        onHide={() => setVisible(false)}
        footer={
          <div>
            <Button
              label={isLoading ? "Uploading" : "Upload"}
              loading={isLoading}
              onClick={async () => {
                if (selectedFile) {
                  await handleUpload();
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
      <div className="w-1/2 lg:w-2/5 flex flex-col mx-auto gap-2">
        <span className="font-semibold">Trạng thái</span>
        <Dropdown
          onChange={(e) =>
            setValue((prevState) => ({
              ...prevState,
              status: e.value,
            }))
          }
          value={value.status}
          options={statusOptions}
        />
        <InputText
          className="p-2"
          id="maSothue"
          placeholder="Mã số thuế"
          onChange={(e) =>
            setValue((prevState) => ({
              ...prevState,
              maSothue: e.target.value,
            }))
          }
          type="text"
          value={value.maSothue}
          name="maSothue"
        />
        <div className="flex gap-2 justify-center">
          <Button
            size="small"
            type="button"
            className="!mt-3 "
            loading={isLoading}
            label={"Tải file"}
            onClick={handleExportExcel}
          />
          <Button
            type="button"
            className="!mt-3"
            loading={isLoading}
            label={"Upload file"}
            onClick={() => setVisible(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default NoBaoHiem;
