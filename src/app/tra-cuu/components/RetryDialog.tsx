import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";

type RetryDialogProps = {
  isOpen: boolean;
  retryFunction: () => Promise<any>;
};

const RetryDialog: React.FC<RetryDialogProps> = ({ isOpen, retryFunction }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);
  return (
    <Dialog
      closable={false}
      style={{ width: "20%" }}
      dismissableMask
      visible={isVisible}
      onHide={() => setIsVisible(false)}
    >
      <div>
        <div className="flex flex-col gap-4 items-center text-lg">
          <p>Lỗi trang nguồn, vui lòng bấm Tra cứu lại</p>
          <Button type="button" onClick={()=>{
            retryFunction()
            setIsVisible(false)
          }}>
            Tra cứu lại
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default RetryDialog;
