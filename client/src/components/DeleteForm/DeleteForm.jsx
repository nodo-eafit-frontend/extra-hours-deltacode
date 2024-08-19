import React, { useState, useEffect } from "react";
import { deleteExtraHour } from "../../services/deleteExtraHour";
import { EmployeeInfo } from "../EmployeeInfo/EmployeeInfo";
import "./DeleteForm.scss";
import { findEmployee } from "../../services/findEmployee";
import { findExtraHour } from "../../services/findExtraHour";
import { ExtraHoursInfo } from "../ExtraHoursInfo/ExtraHoursInfo";

export const DeleteForm = () => {
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

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await deleteExtraHour(extraHours.registry);

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
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      <ExtraHoursInfo onIdChange={handleIdChange} />
      <button type="button" onClick={handleDelete} disabled={loading}>
        {loading ? "Eliminando..." : "Eliminar"}
      </button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};
