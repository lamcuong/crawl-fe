import { Button } from "primereact/button";

import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
export function DialogDemo(props: any) {
  const navigate = useNavigate();
  return (
    <div>
      <Dialog
        closable={false}
        dismissableMask
        visible={props.isShowDialog}
        onHide={() => {
          navigate("/dang-nhap");
        }}
      >
        <p className="sm:max-w-[425px]">
          <div className="flex flex-col gap-4">
            <p>Phiên đăng nhập hết hạn, Vui lòng đăng nhập lại</p>
            <Button type="button" onClick={() => navigate("/dang-nhap")}>
              Đăng nhập lại
            </Button>
          </div>
        </p>
      </Dialog>
    </div>
  );
}
