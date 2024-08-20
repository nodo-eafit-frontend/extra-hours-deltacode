import { Input, Table } from "antd";
import { useState } from "react";
import "./ExtraHoursInfo.scss";
const { Search } = Input;
import { findExtraHour } from "@services/findExtraHour";

export const ExtraHoursInfo = ({ onIdChange }) => {
  const [extraHour, setExtraHour] = useState({});
  const [notFound, setNotFound] = useState();

  const onSearch = async (extraHourRegistry) => {
    console.log("onSearch called with employeeId:", extraHourRegistry);

    try {
      const data = await findExtraHour(extraHourRegistry);

      setExtraHour(data);
      setNotFound(false);
      console.log(
        "Calling onIdChange with extraHourRegistry:",
        extraHourRegistry
      );
      onIdChange(extraHourRegistry);
    } catch (error) {
      console.error(error);
      setNotFound(true);
      setExtraHour({});
    }
  };

  const columns = [
    { title: "Registry", dataIndex: "registry", key: "registry" },
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Diurnal", dataIndex: "diurnal", key: "diurnal" },
    { title: "Nocturnal", dataIndex: "nocturnal", key: "nocturnal" },
    {
      title: "Diurnal Holiday",
      dataIndex: "diurnalHoliday",
      key: "diurnalHoliday",
    },
    {
      title: "Nocturnal Holiday",
      dataIndex: "nocturnalHoliday",
      key: "nocturnalHoliday",
    },
    { title: "Extra Hours", dataIndex: "extraHours", key: "extraHours" },
    { title: "Observations", dataIndex: "observations", key: "observations" },
  ];

  const dataSource = Object.keys(extraHour).length ? [extraHour] : [];

  return (
    <div className="Info">
      <div className="search-container">
        <Search placeholder="Registro" onSearch={onSearch} />
        {notFound && (
          <span>Registro no encontrado, intente con otra registro</span>
        )}
      </div>

      {!!dataSource.length && (
        <div className="detailsInfo">
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            rowKey="registry"
            scroll={{ x: 900 }}
          />
        </div>
      )}
    </div>
  );
};
