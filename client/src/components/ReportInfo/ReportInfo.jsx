import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { findEmployee } from "@services/findEmployee";
import { findExtraHour } from "@services/findExtraHour";
import "./ReportInfo.scss";

export const ReportInfo = () => {
  const [employee, setEmployee] = useState(null);
  const [extraHour, setExtraHour] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (idOrRegistry) => {
    const numericIdOrRegistry = parseInt(idOrRegistry, 10);
    setLoading(true);
    setError(null);

    try {
      const employeeData = await findEmployee(numericIdOrRegistry);
      setEmployee(employeeData);

      const extraHourData = await findExtraHour(numericIdOrRegistry, "id");

      if (!extraHourData.length) {
        const extraHourByRegistry = await findExtraHour(
          numericIdOrRegistry,
          "registry"
        );
        setExtraHour(extraHourByRegistry, "registry");
      } else {
        setExtraHour(extraHourData);
      }
    } catch (error) {
      setError("No se encontraron datos para el ID ingresado.");
      setEmployee(null);
      setExtraHours([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ReportInfo">
      <div className="search-container">
        <Input.Search
          placeholder="Ingrese ID del empleado"
          onSearch={handleSearch}
        />
        {error && <p className="error-message">{error}</p>}
      </div>

      {loading && <p>Cargando datos...</p>}

      {employee && (
        <div className="employee-info">
          <h3>Información del Empleado</h3>
          <div className="description-item">
            <span className="title">Empleado:</span> {employee.name}
          </div>
          <div className="description-item">
            <span className="title">Salario:</span> {employee.salary}
          </div>
          <div className="description-item">
            <span className="title">Cargo:</span> {employee.position}
          </div>
          <div className="description-item">
            <span className="title">Supervisor:</span> {employee.supervisor}
          </div>
        </div>
      )}

      {extraHour.length > 0 && (
        <div className="extra-hours-info">
          <h3>Registros de Horas Extras</h3>
          {extraHour.map((extraHour) => (
            <div key={extraHour.registry} className="detailsInfo">
              <div className="description-item">
                <span className="title">Fecha:</span> {extraHour.date}
              </div>
              <div className="description-item">
                <span className="title">Diurnas:</span> {extraHour.diurnal}
              </div>
              <div className="description-item">
                <span className="title">Nocturnas:</span> {extraHour.nocturnal}
              </div>
              <div className="description-item">
                <span className="title">Diurnas Festivas:</span>{" "}
                {extraHour.diurnalHoliday}
              </div>
              <div className="description-item">
                <span className="title">Nocturnas Festivas:</span>{" "}
                {extraHour.nocturnalHoliday}
              </div>
              <div className="description-item">
                <span className="title">Total Horas Extras:</span>{" "}
                {extraHour.extrasHours}
              </div>
              <div className="description-item">
                <span className="title">Observaciones:</span>{" "}
                {extraHour.observations}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
