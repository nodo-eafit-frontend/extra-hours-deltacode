import React, { useState, useEffect } from "react";
import { updateExtraHour } from "@services/updateExtraHour";
import { EmployeeInfo } from "../EmployeeInfo/EmployeeInfo";
import "./UpdateForm.scss";
import { findEmployee } from "../../services/findEmployee";
import { findExtraHour } from "../../services/findExtraHour";
import { ExtraHoursInfo } from "../ExtraHoursInfo/ExtraHoursInfo";

export const UpdateForm = () => {
  const [extraHours, setExtraHours] = useState({
    registry: "",
    id: "",
    date: "",
    diurnal: 0,
    nocturnal: 0,
    diurnalHoliday: 0,
    nocturnalHoliday: 0,
    extrasHours: 0,
    observations: "",
  });

  // const [extrahours, setExtrahours] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleIdChange = async (registry) => {
    setExtraHours((prevData) => ({ ...prevData, registry }));

    if (registry) {
      try {
        const extraHourData = await findExtraHour(registry);
        setExtraHours(extraHourData);
        setError(null);
      } catch (err) {
        setError("No se pudo encontrar el registro");
      }
    } else {
      setExtraHours(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExtraHours((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const { diurnal, nocturnal, diurnalHoliday, nocturnalHoliday } = extraHours;
    const sumExtraHours =
      (parseFloat(diurnal, 10) || 0) +
      (parseFloat(nocturnal, 10) || 0) +
      (parseFloat(diurnalHoliday, 10) || 0) +
      (parseFloat(nocturnalHoliday, 10) || 0);

    setExtraHours((prevData) => ({
      ...prevData,
      extrasHours: sumExtraHours.toFixed(2),
    }));
  }, [
    extraHours.diurnal,
    extraHours.nocturnal,
    extraHours.diurnalHoliday,
    extraHours.nocturnalHoliday,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const body = { ...extraHours };

    console.log("Datos enviados:", body);

    try {
      await updateExtraHour(body);

      setExtraHours({
        registry: "",
        id: "",
        date: "",
        diurnal: 0,
        nocturnal: 0,
        diurnalHoliday: 0,
        nocturnalHoliday: 0,
        extrasHours: 0,
        observations: "",
      });

      setExtraHours(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Diurna", name: "diurnal" },
    { label: "Nocturna", name: "nocturnal" },
    { label: "Diurna Festiva", name: "diurnalHoliday" },
    { label: "Nocturna Festiva", name: "nocturnalHoliday" },
    { label: "Horas extra", name: "extrasHours", readOnly: true },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <ExtraHoursInfo onIdChange={handleIdChange} />
      <div>
        <label htmlFor="date"></label>
        <input
          type="date"
          id="date"
          name="date"
          value={extraHours.date}
          onChange={handleChange}
        />
      </div>
      <div className="form-group-horizontal">
        {fields.map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              type="number"
              name={field.name}
              value={extraHours[field.name]}
              onChange={handleChange}
              step="0.01"
              readOnly={field.readOnly || false}
            />
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="observations">Observaciones</label>
        <textarea
          id="observations"
          name="observations"
          value={extraHours.observations}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Actualizar"}
      </button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};
