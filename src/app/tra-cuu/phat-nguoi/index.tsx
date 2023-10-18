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
  const [isLoading,setIsLoading] = useState(false)
  // const regex = /(\d{2}[A-Za-z])/;
  // const resetData = ()=>{
  //   setList([])
  // }
  const handleSubmit = async () => {
    // resetData()
    LoadingService.start()
    setIsLoading(true)
    try {
      const list = bienSo.replaceAll(/\s+/g, "").split(/[,;]/);
      const danhSachBien = [];
      for (const plate of list) {
        const data = await crawlApi.getPhatNguoi({ licenseNumber: plate });
        danhSachBien.push(plate + "\n" + data.data);
      }
      // setList(danhSachBien);
      renderResult(danhSachBien);
      setIsLoading(false)
    } catch (error) {
      LoadingService.stop()
      if (error?.response?.status === 401) {
        setIsShowDialog(true);
      }
    }
    LoadingService.stop()
  };
  const renderResult = (list) => {
    setJsxContent(null);
    const startText = "KIỂM TRA PHẠT NGUỘI";
    const resultText = "Chúc mừng!";
    for (let i = 0; i < list.length; i++) {
      const splittedText = list[i].split("\n");
      for (let j = 0; j < splittedText.length; j++) {
        if (splittedText[j] === startText) {
          const newTextArray = splittedText.slice(0, 1).concat(splittedText.slice(7));
          if (newTextArray[2] === resultText) {
            setJsxContent((prevJsxContent) => (
              <>
                {prevJsxContent}
                <hr className="my-5 mx-5 lg:mx-10 bg-black h-[2px]" />
                <div className="px-5 lg:px-10">
                  <p>{newTextArray[2]}</p>
                  <p>{newTextArray[3]}</p>
                </div>
              </>
            ));
            break;
          } else {
            setJsxContent((prevJsxContent) => {
              return (
                <div>
                  {prevJsxContent}
                  <hr className="my-5 mx-5 lg:mx-10 bg-black h-[2px]" />
                  <div className="px-5 lg:px-10">
                    {newTextArray.slice(0, newTextArray.length - 5).map((item, index) => {
                      return (
                        <p>
                          {index === 0
                            ? `Biển số: ${item.replace(/(\d{2}[A-Z])/, "$1-").replace(/(\d{2})(\d{2})$/, "$1.$2")}`
                            : item}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            });

            break;
          }
        }
      }
    }
  };
  // console.log(list[0]?.split("\n")[0].replace(/(\d{2}[A-Z])/, '$1-').replace(/(\d{2})(\d{2})$/, '$1.$2'))
  return (
    <>
      <DialogDemo isShowDialog={isShowDialog} />
      <div className="mt-10 min-w-fit w-1/2 mx-auto">
        <InputText className="w-full" onChange={(e) => setBienSo(e.target.value)} placeholder="Không cần nhập các kí tự đặc biệt như . - " />
        <p className="text-[14px] text-gray-500 my-2">
          Nhập vào biển số xe hợp lệ, ví dụ: 20C11770. Các biển số xe cách nhau bằng dấu , hoặc <Button className="!text-sm !h-auto !p-2 !align-baseline">Import excel</Button>
        </p>
        <Button loading={isLoading} type="button" onClick={handleSubmit} className="!block !mt-5 !mx-auto ">
          {isLoading ? "Đang tra cứu": "Tra cứu"}
        </Button>
      </div>
     
      {jsxContent}
    </>

    // <div>
    //   <input type="file" onChange={handleFileUpload} accept=".xlsx" />
    //   {jsonData && (
    //     <table>
    //       <thead>
    //         <tr>
    //           {Object.keys(jsonData[0]).map((key) => (
    //             <th key={key}>{key}</th>
    //           ))}
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {jsonData.map((item, index) => (
    //           <tr key={index}>
    //             {Object.values(item).map((value, idx) => (
    //               <td key={idx}>{value}</td>
    //             ))}
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   )}
    // </div>
  );
};

export default PhatNguoi;
