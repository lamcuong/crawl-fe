//@ts-nocheck
import moment from "moment";
import { Dialog } from "primereact/dialog";
import React from "react";

type DetailDialogProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  content: any;
  dialogName: string;
};

const noBaoHiemFields = [
  {
    field: "dateDebt",
    header: "Khoảng thời gian phát sinh",
  },
  {
    field: "code",
    header: "Mã đơn vị",
  },
  {
    field: "name",
    header: "Tên tổ chức cá nhân",
  },
  {
    field: "address",
    header: "Địa chỉ trụ sở",
  },

  {
    field: "monthDebt",
    header: "Số tháng nợ",
  },
  {
    field: "moneyDebt",
    header: "Số tiền nợ",
  },
  {
    field: "numberWorkers",
    header: "Số nhân viên bị khoá thẻ",
  },
  {
    field: "note",
    header: "Ghi chú",
  },
];

const cuongCheThueFields = [
  {
    field: "tenLoaiThongBao",
    header: "Tên loại thông báo",
  },
  {
    field: "cqThueNhanThongBao",
    header: "Cơ quan thuế nhận thông báo",
  },
  {
    field: "ngayThongBao",
    header: "Ngày thông báo",
  },
  {
    field: "ghiChu",
    header: "Ghi chú",
  },
  {
    field: "trangThai",
    header: "Trạng thái",
  },
];

const ruiRoThue = [
  {
    field: "tenToChucCaNhan",
    header: "Tên tổ chức cá nhân",
  },
  {
    field: "soQuyetDinh",
    header: "Số quyết định",
  },
  {
    field: "ngayQuyetDinh",
    header: "Ngày quyết định",
  },
  {
    field: "ngayDungSuDung",
    header: "Ngày sử dụng",
  },
  {
    field: "ngayThongBao",
    header: "Ngày thông báo",
  },
  {
    field: "tThai",
    header: "Trạng thái",
  },
];

const DetailDialog: React.FC<DetailDialogProps> = ({ visible, setVisible, content, dialogName }) => {
  const render = () => {
    let field;
    switch (dialogName) {
      case "Cưỡng chế thuế":
        field = cuongCheThueFields;
        break;
      case "Rủi ro cao về thuế":
        field = ruiRoThue;
        break;
      case "Nợ bảo hiểm xã hội hiện hữu":
        field = noBaoHiemFields;
        break;
    }

    return content?.map((value) => {
      return (
        <div className="border-y">
          {field.map((item, index) => {
            return (
              <div className="flex">
                <p className="basis-1/3 font-semibold">{item.header}</p>
                <p className="flex-1">
                  {typeof value[item.field] === "number"
                    ? value[item.field].toLocaleString()
                    : moment(value[item.field], moment.ISO_8601).isValid()
                    ? moment(value[item.field]).format("DD/MM/YYYY")
                    : value[item.field]}
                </p>
              </div>
            );
          })}
        </div>
      );
    });
  };
  return (
      <Dialog
        dismissableMask
        header={dialogName}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        {render()}
      </Dialog>
  );
};

export default DetailDialog;
