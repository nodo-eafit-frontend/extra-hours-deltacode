import { Input, Space } from "antd";
import { useState } from "react";
import "./EmployeeInfo.scss";
const { Search } = Input;
import { Description } from "@components";
import { findEmployee } from "@services/findEmployee";

export const EmployeeInfo = () => {
  const [employee, setEmployee] = useState({});
  const [notFound, setNotFound] = useState();

  const onSearch = async (employeeId) => {
    try {
      const data = await findEmployee(employeeId);

      setEmployee(data);
      setNotFound(false);
    } catch (error) {
      console.error(error);
      setNotFound(true);
      setEmployee({});
    }
  };

  return (
    <div className="Info">
      <div className="search-container">
        <Search placeholder="Cédula" onSearch={onSearch} />
        {notFound && (
          <span>Empleado no encontrado, intente con otra cédula</span>
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
    </div>
  );
};
