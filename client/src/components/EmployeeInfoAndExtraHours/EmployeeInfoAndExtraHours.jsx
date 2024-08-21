import { Input, Table } from "antd";
import { useState } from "react";
import "./EmployeeInfoAndExtraHours.scss";
import { findEmployee } from "@services/findEmployee";
import { findExtraHour } from "@services/findExtraHour";

const { Search } = Input;

export const EmployeeInfoAndExtraHours = () => {
  const [employee, setEmployee] = useState({});
  const [extraHours, setExtraHours] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const onSearch = async (employeeId) => {
    console.log("onSearch called with employeeId:", employeeId);

    try {
      const employeeData = await findEmployee(employeeId);
      setEmployee(employeeData);

      const extraHourData = await findExtraHour(employeeId);
      setExtraHours(extraHourData ? [extraHourData] : []);

      setNotFound(false);
    } catch (error) {
      console.error(error);
      setNotFound(true);
      setEmployee({});
      setExtraHours([]);
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
  console.log("Data in extraHours:", extraHours);
  console.log("Columns configuration:", columns);

  return (
    <div className="Info">
      <div className="search-container">
        <Search placeholder="Cédula" onSearch={onSearch} />
        {notFound && (
          <span>
            Empleado o registro de horas extra no encontrado, intente con otra
            cédula
          </span>
        )}
      </div>

      {!!Object.keys(employee).length && (
        <div className="detailsInfo">
          <div className="description-item">
            <div className="title">Empleado</div>
            <div className="description">{employee.name}</div>
          </div>
          <div className="description-item">
            <div className="title">Salario</div>
            <div className="description">{employee.salary}</div>
          </div>
          <div className="description-item">
            <div className="title">Cargo</div>
            <div className="description">{employee.position}</div>
          </div>
          <div className="description-item">
            <div className="title">Supervisor</div>
            <div className="description">{employee.supervisor}</div>
          </div>
        </div>
      )}

      {!!extraHours.length && (
        <div className="detailsInfo">
          <Table
            columns={columns}
            dataSource={extraHours}
            pagination={false}
            rowKey="registry"
            scroll={{ x: 900 }}
          />
        </div>
      )}
    </div>
  );
};
