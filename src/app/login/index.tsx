//@ts-nocheck
import Cookies from "js-cookie";
import React, { useState } from "react";
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'
import {useNavigate} from 'react-router-dom'
import crawlApi from "../../apis";
import { ToastContainer, toast } from "react-toastify";
type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<any>({
    username: "",
    password: "",
  });
  const handleChange = (name, newValue) => {
    setValue({ ...value, [name]: newValue });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await crawlApi.login({ ...value });
      if (data.access_token) {
        Cookies.set("Authorization", data.access_token);
        navigate("/tra-cuu/danh-sach");
      }
      setValue({
        username: "",
        password: "",
      });
    } catch (error) {
      toast.error("Sai tên đăng nhập hoặc mật khẩu");
    }
  };
  return (
    <form className=" w-[90%] lg:w-1/4 flex flex-col gap-4 mx-auto mt-10" onSubmit={handleSubmit}>
      <ToastContainer pauseOnFocusLoss={false} autoClose={1000} position="top-center" />

      <InputText
        placeholder="Tài khoản"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        className=" border-black"
        type="text"
        value={value.username}
        name="username"
      />
      <InputText
        placeholder="Mật khẩu"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        className=" border-black"
        type="password"
        value={value.password}
        name="password"
      />
      <Button className="w-1/2 justify-center text-lg !mx-auto" type="submit">
        Đăng nhập
      </Button>
    </form>
  );
};

export default Login;
