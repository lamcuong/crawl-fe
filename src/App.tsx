import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./app/layout/header";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <ToastContainer autoClose={2000} pauseOnFocusLoss={false} position="top-center" />
      <div className="px-2 lg:px-5 mb-5">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
