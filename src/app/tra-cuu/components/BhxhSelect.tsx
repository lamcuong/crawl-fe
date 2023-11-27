import React, { useEffect, useState } from 'react'
import crawlApi from '../../../apis';
import { Dropdown } from 'primereact/dropdown';

type BHXHProps = {
    valueBHXH: any,
    setValueBHXH: any
}

const BHXH: React.FC<BHXHProps> = ({valueBHXH, setValueBHXH}) => {
    const [danhSachTinhThanh, setDanhSachTinhThanh] = useState([]);
    const [danhSachDonVi, setDanhSachDonVi] = useState([]);
    useEffect(() => {
      crawlApi.getDanhSachTinhThanh().then((r) => {
        const options: any = [{ code: "*", name: "Chọn tỉnh thành" }];
        r?.data?.forEach((item: any) => {
            options.push({ code: item.code, name: item.name });
        });
        setDanhSachTinhThanh(options);
      });
    }, []);
    useEffect(() => {
      if (valueBHXH.tinhThanh.code) {
        crawlApi.getDanhSachDonViBHXH(valueBHXH.tinhThanh.code).then((r) => {
          const options: any = [];
          r?.data?.forEach((item: any) => {
            options.push({ code: item.code, name: item.name });
          });
          setDanhSachDonVi(options);
        });
      }
    },[valueBHXH.tinhThanh.code]);
    useEffect(()=>{
      setValueBHXH((prevState:any)=>({
          ...prevState,
          donVi: danhSachDonVi[0]
      }))
    },[danhSachDonVi, setValueBHXH])
    return (
      <div>
        <p className="font-semibold">Chọn cơ quan bảo hiểm</p>
        <div className="flex gap-2">
          <Dropdown
            value={valueBHXH.tinhThanh}
            options={danhSachTinhThanh}
            onChange={(e) => {
              setValueBHXH((prevState:any) => ({
                ...prevState,
                tinhThanh: e.value,
              }));
            }}
            filter={true}
            optionLabel="name"
            placeholder="Chọn cơ quan bảo hiểm"
            className="w-full overflow-hidden"
          />
          <Dropdown
            value={valueBHXH.donVi}
            options={danhSachDonVi}
            onChange={(e) =>
              setValueBHXH((prevState:any) => ({
                ...prevState,
                donVi: e.value,
              }))
            }
            optionLabel="name"
            filter={true}
            className="w-full overflow-hidden"
          />
        </div>
      </div>
    );
}

export default BHXH
