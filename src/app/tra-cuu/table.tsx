import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

interface DataType {
  tenNNT: string;
  MST: number;
  ghiChu: string;
}
type DataProps = {
  data: DataType[];
  columns: ColumnsType<DataType>;
  title: string;
};

const TableComponent: React.FC<DataProps> = ({ data, columns, title }) => {
  const [isWideScreen, setIsWideScreen] = useState(false);
  const handleResize = () => {
    setIsWideScreen(window.innerWidth >= 1024);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize",handleResize);
    };
  }, []);

  return (
    <div>
      <p className="font-bold">{title}</p>
      <Table size={`${isWideScreen ? "large" : "small"}`} bordered columns={columns} dataSource={data} />
    </div>
  );
};

export default TableComponent;
