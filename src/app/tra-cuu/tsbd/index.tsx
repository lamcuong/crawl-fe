//@ts-nocheck
import React, { useState } from "react";
// import _axios from "@/api/config";
// import { DialogDemo } from "../login";
import { LoadingService } from "../../../utils/LoadingService";
import { DialogDemo } from "../dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import crawlApi from "../../../apis";
type TaiSanProps = {};

const TaiSan: React.FC<TaiSanProps> = () => {
  const formatData = (data) => {
    const startText = "Mô tả tài sản bảo đảm";
    const endText = "ĐĂNG KÝ GIAO DỊCH BẢO ĐẢM";
    const emptyText = "Không có bản ghi nào dựa trên tiêu chí tìm kiếm được tìm thấy."
    let sampleList = [];
    let startIndex = -1;
    let endIndex = -1;
    if(data.includes(emptyText)) {
      setData([emptyText])
      return
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i] === startText) {
        startIndex = i;
      }
      if (data[i]?.includes(endText)) {
        endIndex = i;
      }
      if (
        (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) ||
        (startIndex !== -1 && i === data.length - 1 && endIndex === -1)
      ) {
        console.log(startIndex, endIndex);
        const extractedData = data.slice(startIndex + 1, endIndex);
        sampleList.push(extractedData);
        startIndex = -1;
        endIndex = -1;
      }
    }
    setData(sampleList);
  };
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const resetData=()=>{
    setData([])
  }
  const handleSubmit = async () => {
    LoadingService.start()
    resetData()
    setIsLoading(true);
    try {
      const data = await crawlApi.getTaiSan({ taxCode: value });
      console.log(data)
      formatData(data.data.split("\n"));
      setIsLoading(false);
    } catch (error) {
console.log('err',error)
      LoadingService.stop()
      if (error?.response?.status === 401) {
        setIsShowDialog(true);
      }
    }
    setIsLoading(false);
    LoadingService.stop()
  };
  return (
    <div className="mt-9 mx-auto flex flex-col">
      <DialogDemo isShowDialog={isShowDialog} />
      <div className="w-1/2 !block !mx-auto">
      <label htmlFor="taxCode">Mã số thuế/Số đăng ký kinh doanh</label>
      <InputText id="taxCode"  onChange={(e) => setValue(e.target.value)} value={value} className="border-black w-full " />
      </div>
      <Button loading={isLoading} onClick={handleSubmit} className="block !mt-4 !mx-auto" type="button">
        {isLoading ? "Đang tra cứu" : "Tra cứu"}
      </Button>
    
      {data.length > 0 && (
        <div>
          {data?.map((item) => {
            return (
              <div>
                <h3 className="font-bold my-4">Mô tả tài sản bảo đảm</h3>
                <div className="border border-neutral-300 p-5">
                  {Array.isArray(item) ? (
                    item?.map((text) => {
                      return <p className="my-1">{text}</p>;
                    })
                  ): item}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaiSan;
