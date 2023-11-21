import ReactDOM from "react-dom/client";
import "./index.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./app/login";
import TraCuu from "./app/tra-cuu/danh-sach";
import App from "./App";
import TaiSan from "./app/tra-cuu/tsbd";
import PhatNguoi from "./app/tra-cuu/phat-nguoi";
import ThueVaNghiaVuKhac from "./app/tra-cuu/thue-va-nghia-vu-khac";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const router = createBrowserRouter([
  {
    path: "/dang-nhap",
    element: <Login />,
  },
  {
    element: <App />,
    children: [
      { path: "/tra-cuu/danh-sach", element: <TraCuu /> },
      {
        path: "/tra-cuu/tsbd",
        element: <TaiSan />,
      },
      {
        path: "/tra-cuu/phat-nguoi",
        element: <PhatNguoi />,
      },
      {
        path: "/tra-cuu/thue-va-nghia-vu-khac",
        element: <ThueVaNghiaVuKhac />,
      },
      {
        path: "*",
        element: <Navigate to={"/tra-cuu/danh-sach"} replace />,
      },
    ],
  },
]);
root.render(
  <>
    <div className="app-loading-overlay" id="app-loading-overlay">
      <div className="loading-spinner"></div>
    </div>
    <RouterProvider router={router} />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
