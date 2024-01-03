//@ts-nocheck
import "../../layout/tsbd/index.css";
import React, { useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import { DialogLogin } from "../components/LoginDialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import crawlApi from "../../../apis";
import { toast } from "react-toastify";
import RetryDialog from "../components/RetryDialog";
type TaiSanProps = {};

const TaiSan: React.FC<TaiSanProps> = () => {
  const initialValue = {
    taxCode: "",
    soKhung: "",
    keyHighlight: "",
  };
  const [value, setValue] = useState(initialValue);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [searchType, setSearchType] = useState("taxCode");
  const [isError, setIsError] = useState(false)
  const resetData = () => {
    setData([]);
    setIsError(false)
  };

  const handleSubmit = async () => {
    resetData();
    setIsLoading(true);
    try {
      const data = await crawlApi.getTaiSan({
        taxCode: value.taxCode || null,
        soKhung: value.soKhung || null,
        keyHighlight: value.keyHighlight || null,
      });
      if(data.data?.isError){
        setIsError(true)
      }else {
        setData(data.data.html);
        setIsLoading(false);
        toast.success("Tra cứu thành công");
      }
     
    } catch (error) {
      if (error?.response?.status === 401) {
        setIsShowDialog(true);
      } else {
        toast.error(error || `Lỗi hệ thống, Vui lòng thử lại`);
      }
    }
    setIsLoading(false);
  };
  const handleRetrySubmit = async () => {
    try {
      await crawlApi.getTaiSan({
        taxCode: value.taxCode || null,
        soKhung: value.soKhung || null,
        keyHighlight: value.keyHighlight || null,
        retry: true,
      });
      // setData(data.data.html);
    } catch (error) {
      if (error?.response?.status === 401) {
        setIsShowDialog(true);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSearchTypeChange = (e) => {
    setValue(initialValue);
    setSearchType(e.target.value);
  };
  return (
    <div className="mx-auto flex flex-col">
      <DialogLogin isShowDialog={isShowDialog} />
      <RetryDialog isOpen={isError} retryFunction={handleRetrySubmit} />
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
            inputId="soKhung"
            name="soKhung"
            value="soKhung"
            onChange={handleSearchTypeChange}
            checked={searchType === "soKhung"}
          />
          <label htmlFor="soKhung" className="ml-2">
            Tra cứu theo Số khung
          </label>
        </div>
      </div>
      <div className="w-1/2 !block !mx-auto mt-5">
        {searchType === "taxCode" ? (
          <div>
            <label htmlFor="taxCode">Mã số thuế</label>
            <InputText
              name="taxCode"
              id="taxCode"
              onChange={handleChange}
              value={value.taxCode}
              className="border-black w-full "
            />
          </div>
        ) : (
          <div>
            <label htmlFor="soKhung">Số khung</label>
            <InputText
              name="soKhung"
              id="soKhung"
              onChange={handleChange}
              value={value.soKhung}
              className="border-black w-full "
            />
          </div>
        )}
        <div className="mt-2">
          <label htmlFor="keyHighlight">Thông tin tài sản</label>
          <InputText
            name="keyHighlight"
            id="keyHighlight"
            onChange={handleChange}
            value={value.keyHighlight}
            className="border-black w-full "
            placeholder="Các từ khoá cách nhau bằng dấu phẩy (,)"
          />
        </div>
      </div>
      <Button
        loading={isLoading}
        onClick={handleSubmit}
        className="block !mt-4 !mx-auto"
        type="button"
        label={isLoading ? "Đang tra cứu" : "Tra cứu"}
      ></Button>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
};

export default TaiSan;
