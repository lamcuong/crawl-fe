import { Table } from "antd";
import { useEffect, useState } from "react";

type DataProps = {
  data: any;
  columns: any;
  title: string;
  className?: string;
  pagination?: boolean;
};

const TableComponent: React.FC<DataProps> = ({ data, columns, title, className, pagination }) => {
  const [isWideScreen, setIsWideScreen] = useState(false);
  const handleResize = () => {
    setIsWideScreen(window.innerWidth >= 1024);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={className}>
      <p className="font-bold">{title}</p>
      <Table
        pagination={pagination === false ? false : {}}
        className="whitespace-break-spaces"
        size="small"
        bordered
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default TableComponent;
