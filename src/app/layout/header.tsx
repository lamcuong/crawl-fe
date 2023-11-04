import React, { useState } from "react";
import { Button } from "primereact/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const activeClass = "!bg-neutral-500 !hover:bg-neutral-500 !cursor-not-allowed !border-0 focus:!shadow-none ";
  return (
    <>
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <ul className="flex flex-col ">
          <li>
            <Button
              label="Thông tin doanh nghiệp"
              className={`${path === "/tra-cuu/danh-sach" && activeClass} !text-left w-full !rounded-none`}
              type="button"
              onClick={() => {
                setVisible(false);
                navigate("/tra-cuu/danh-sach");
              }}
            />
          </li>
          <li>
            <Button
              className={`${path === "/tra-cuu/tsbd" && activeClass} !text-left w-full !rounded-none`}
              type="button"
              onClick={() => {
                setVisible(false);
                navigate("/tra-cuu/tsbd");
              }}
              label="Tài sản bảo đảm"
            ></Button>
          </li>
          <li>
            <Button
              className={`${path === "/tra-cuu/phat-nguoi" && activeClass} !text-left w-full !rounded-none`}
              type="button"
              onClick={() => {
                setVisible(false);
                navigate("/tra-cuu/phat-nguoi");
              }}
              label="Phạt nguội"
            ></Button>
          </li>
        </ul>
      </Sidebar>
      <div className="bg-neutral-200 p-5 ">
        <Button className="lg:!hidden block" type="button" onClick={() => setVisible(true)}>
          <i className="pi pi-bars"></i>
        </Button>

        <ul className=" gap-10 hidden lg:flex">
          <li>
            <Button
              label="Thông tin doanh nghiệp"
              className={path === "/tra-cuu/danh-sach" ? activeClass : ""}
              type="button"
              onClick={() => {
                navigate("/tra-cuu/danh-sach");
              }}
            />
          </li>
          <li>
            <Button
              className={path === "/tra-cuu/tsbd" ? activeClass : ""}
              type="button"
              onClick={() => {
                navigate("/tra-cuu/tsbd");
              }}
              label="Tài sản bảo đảm"
            ></Button>
          </li>
          <li>
            <Button
              className={path === "/tra-cuu/phat-nguoi" ? activeClass : ""}
              type="button"
              onClick={() => {
                navigate("/tra-cuu/phat-nguoi");
              }}
              label="Phạt nguội"
            ></Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
