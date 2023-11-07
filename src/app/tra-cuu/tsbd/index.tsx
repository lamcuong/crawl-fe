//@ts-nocheck
import "../../layout/tsbd/index.css";
import React, { useState } from "react";
// import _axios from "@/api/config";
// import { DialogDemo } from "../login";
import { RadioButton } from "primereact/radiobutton";
import { LoadingService } from "../../../utils/LoadingService";
import { DialogDemo } from "../dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import crawlApi from "../../../apis";
type TaiSanProps = {};

const TaiSan: React.FC<TaiSanProps> = () => {
  const [files, setFiles] = useState([]);
  // const formatData = (data) => {
  //   const startText = "Mô tả tài sản bảo đảm";
  //   const endText = "ĐĂNG KÝ GIAO DỊCH BẢO ĐẢM";
  //   const emptyText = "Không có bản ghi nào dựa trên tiêu chí tìm kiếm được tìm thấy.";
  //   let sampleList = [];
  //   let startIndex = -1;
  //   let endIndex = -1;
  //   if (data.includes(emptyText)) {
  //     setData([emptyText]);
  //     return;
  //   }
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i] === startText) {
  //       startIndex = i;
  //     }
  //     if (data[i]?.includes(endText)) {
  //       endIndex = i;
  //     }
  //     if (
  //       (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) ||
  //       (startIndex !== -1 && i === data.length - 1 && endIndex === -1)
  //     ) {
  //       const extractedData = data.slice(startIndex + 1, endIndex);
  //       sampleList.push(extractedData);
  //       startIndex = -1;
  //       endIndex = -1;
  //     }
  //   }
  //   setData(sampleList);
  // };
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
  const resetData = () => {
    setData([]);
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
      setData(data.data.html);
      setIsLoading(false);
    } catch (error) {
      if (error?.response?.status === 401) {
        setIsShowDialog(true);
      }
    }
    setIsLoading(false);
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
    <div className="mt-9 mx-auto flex flex-col">
      <DialogDemo isShowDialog={isShowDialog} />
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
            <label htmlFor="taxCode">Mã số thuế/Số đăng ký kinh doanh</label>
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
