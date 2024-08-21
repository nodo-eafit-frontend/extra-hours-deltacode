import React, { useState, useEffect } from "react";
import { addExtraHour } from "@services/addExtraHour";
import { EmployeeInfo } from "../EmployeeInfo/EmployeeInfo";
import "./FormExtraHour.scss";

export const FormExtraHour = () => {
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

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleIdChange = (id) => {
    console.log("handleIdChange called with id:", id);
    setExtraHours((prevData) => {
      const updatedData = { ...prevData, id: parseInt(id, 10) };
      console.log("extraHours updated to:", updatedData);
      return updatedData;
    });
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
      extrasHours: parseFloat(sumExtraHours.toFixed(2)),
    }));
  }, [
    extraHours.diurnal,
    extraHours.nocturnal,
    extraHours.diurnalHoliday,
    extraHours.nocturnalHoliday,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with extraHours:", extraHours);
    setLoading(true);
    setError(null);

    const registry = Date.now() % 1_000_000;
    const body = {
      ...extraHours,
      registry,
    };
    console.log("Datos enviados:", body);

    try {
      await addExtraHour(body);

      alert("Horas extras agregadas exitosamente");

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

      setEmployee({});
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <EmployeeInfo onIdChange={handleIdChange} />
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
        <label>Diurna</label>
        <input
          type="number"
          name="diurnal"
          value={extraHours.diurnal}
          onChange={handleChange}
          step="0.01"
        />
        <label>Nocturna</label>
        <input
          type="number"
          name="nocturnal"
          value={extraHours.nocturnal}
          onChange={handleChange}
          step="0.01"
        />
        <label>Diurna Festiva</label>
        <input
          type="number"
          name="diurnalHoliday"
          value={extraHours.diurnalHoliday}
          onChange={handleChange}
          step="0.01"
        />
        <label>Nocturna festiva</label>
        <input
          type="number"
          name="nocturnalHoliday"
          value={extraHours.nocturnalHoliday}
          onChange={handleChange}
          step="0.01"
        />
        <label>Horas extra</label>
        <input
          type="number"
          name="extrasHours"
          value={extraHours.extrasHours}
          readOnly
        />
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
        {loading ? "Enviando..." : "Agregar"}
      </button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};
