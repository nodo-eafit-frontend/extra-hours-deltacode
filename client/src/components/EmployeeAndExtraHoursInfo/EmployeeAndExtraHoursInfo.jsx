import { Input } from "antd";
import { useState } from "react";
import "./EmployeeAndExtraHoursInfo.scss";
import { findEmployee } from "../../services/findEmployee";
import { findExtraHour } from "../../services/findExtraHour";

const { Search } = Input;

export const EmployeeAndExtraHoursInfo = () => {
  const [employee, setEmployee] = useState({});
  const [extraHours, setExtraHours] = useState([]);
  const [notFoundEmployee, setNotFoundEmployee] = useState(false);
  const [notFoundExtraHours, setNotFoundExtraHours] = useState(false);

  const onSearch = async (id) => {
    console.log("onSearch called with id:", id);

    try {
      const employeeData = await findEmployee(id);
      setEmployee(employeeData);
      setNotFoundEmployee(false);
    } catch (error) {
      console.error(error);
      setNotFoundEmployee(true);
      setEmployee({});
    }

    try {
      const extraHoursData = await findExtraHour(id);
      setExtraHours(extraHoursData);
      setNotFoundExtraHours(false);
    } catch (error) {
      console.error(error);
      setNotFoundExtraHours(true);
      setExtraHours([]);
    }
  };

  return (
    <div className="Info">
      <div className="search-container">
        <Search placeholder="Cédula" onSearch={onSearch} />
        {(notFoundEmployee || notFoundExtraHours) && (
          <span>
            {notFoundEmployee
              ? "Empleado no encontrado, intente con otra cédula"
              : "Registro de horas extra no encontrado, intente con otro ID"}
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
          {extraHours.map((extraHour) => (
            <div key={extraHour.registry} className="extraHourDetails">
              <div className="description-item">
                <div className="title">Registro</div>
                <div className="description">{extraHour.registry}</div>
              </div>
              <div className="description-item">
                <div className="title">Fecha</div>
                <div className="description">{extraHour.date}</div>
              </div>
              <div className="description-item">
                <div className="title">Horas Diurnas</div>
                <div className="description">{extraHour.diurnal}</div>
              </div>
              <div className="description-item">
                <div className="title">Horas Nocturnas</div>
                <div className="description">{extraHour.nocturnal}</div>
              </div>
              <div className="description-item">
                <div className="title">Horas Diurnas en Festivos</div>
                <div className="description">{extraHour.diurnalHoliday}</div>
              </div>
              <div className="description-item">
                <div className="title">Horas Nocturnas en Festivos</div>
                <div className="description">{extraHour.nocturnalHoliday}</div>
              </div>
              <div className="description-item">
                <div className="title">Horas Extras</div>
                <div className="description">{extraHour.extraHours}</div>
              </div>
              <div className="description-item">
                <div className="title">Observaciones</div>
                <div className="description">{extraHour.observations}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
