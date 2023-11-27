import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import crawlApi from "../../../apis";

type CQTProps = {
    valueCQT: any,
    setValueCQT: any
};

const CQT: React.FC<CQTProps> = ({valueCQT, setValueCQT}) => {
  const [cqtTinhOptions, setCqtTinhOptions] = useState([]);
  const [cqtQuanLyOptions, setCqtQuanLyOptions] = useState([]);
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
  },[valueCQT.cqtTinh.code]);
  useEffect(()=>{
    setValueCQT((prevState:any)=>({
        ...prevState,
        cqtQuanLy: cqtQuanLyOptions[0]
    }))
  },[cqtQuanLyOptions, setValueCQT])
  return (
    <div>
      <p className=" font-semibold">Chọn cơ quan thuế</p>
      <div className="flex gap-2">
        <Dropdown
          value={valueCQT.cqtTinh}
          options={cqtTinhOptions}
          onChange={(e) => {
            setValueCQT((prevState:any) => ({
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
            setValueCQT((prevState:any) => ({
              ...prevState,
              cqtQuanLy: e.value,
            }))
          }
          optionLabel="name"
          filter={true}
          className="w-full overflow-hidden"
        />
      </div>
    </div>
  );
};

export default CQT;
