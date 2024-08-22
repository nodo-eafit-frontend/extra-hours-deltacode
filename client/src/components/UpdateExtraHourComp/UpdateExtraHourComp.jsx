import React, { useState, useEffect } from "react";
import { findExtraHour } from "@services/findExtraHour";
import { ExtraHoursInfo } from "../ExtraHoursInfo/ExtraHoursInfo";
import "./UpdateExtraHourComp.scss";

export const UpdateExtraHourComp = () => {
  const [extraHour, setExtraHour] = useState({
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleIdChange = (registry) => {
    console.log("handleIdChange called with registry:", registry);
    setExtraHour((prevData) => {
      const updatedData = { ...prevData, registry: parseInt(registry, 10) };
      console.log("extraHour updated to:", updatedData);
      return updatedData;
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExtraHour((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const { diurnal, nocturnal, diurnalHoliday, nocturnalHoliday } = extraHour;
    const sumExtraHours =
      (parseFloat(diurnal, 10) || 0) +
      (parseFloat(nocturnal, 10) || 0) +
      (parseFloat(diurnalHoliday, 10) || 0) +
      (parseFloat(nocturnalHoliday, 10) || 0);

    setExtraHour((prevData) => ({
      ...prevData,
      extrasHours: parseFloat(sumExtraHours.toFixed(2)),
    }));
  }, [
    extraHour.diurnal,
    extraHour.nocturnal,
    extraHour.diurnalHoliday,
    extraHour.nocturnalHoliday,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with extraHour:", extraHour);
    setLoading(true);
    setError(null);

    // const registry = Date.now() % 1_000_000;
    // const body = {
    //   ...extraHour,
    //   registry,
    // };
    // console.log("Datos enviados:", body);

    try {
      await findExtraHour(registry);

      alert("Horas extras actualizadas exitosamente");

      setExtraHour({
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

      // setEmployee({});
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ExtraHoursInfo onIdChange={handleIdChange} />
      <div>
        <label htmlFor="date"></label>
        <input
          type="date"
          id="date"
          name="date"
          value={extraHour.date}
          onChange={handleChange}
        />
      </div>
      <div className="form-group-horizontal">
        <label>Diurna</label>
        <input
          type="number"
          name="diurnal"
          value={extraHour.diurnal}
          onChange={handleChange}
          step="0.01"
        />
        <label>Nocturna</label>
        <input
          type="number"
          name="nocturnal"
          value={extraHour.nocturnal}
          onChange={handleChange}
          step="0.01"
        />
        <label>Diurna Festiva</label>
        <input
          type="number"
          name="diurnalHoliday"
          value={extraHour.diurnalHoliday}
          onChange={handleChange}
          step="0.01"
        />
        <label>Nocturna festiva</label>
        <input
          type="number"
          name="nocturnalHoliday"
          value={extraHour.nocturnalHoliday}
          onChange={handleChange}
          step="0.01"
        />
        <label>Horas extra</label>
        <input
          type="number"
          name="extrasHours"
          value={extraHour.extrasHours}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="observations">Observaciones</label>
        <textarea
          id="observations"
          name="observations"
          value={extraHour.observations}
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
