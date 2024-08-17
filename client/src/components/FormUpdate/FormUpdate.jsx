import React, { useState, useEffect } from "react";
import "./FormUpdate.scss";

export const FormUpdate = () => {
  const [extraHours, setExtraHours] = useState({
    registry: "",
    id: "",
    date: "",
    extraHours: {
      diurnal: "",
      nocturnal: "",
      diurnalHollyday: "",
      nocturnalHollyday: "",
      extrasHours: "",
    },
    observations: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExtraHours((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const { diurnal, nocturnal, diurnalHollyday, nocturnalHollyday } =
      extraHours;
    const sumExtraHours =
      (parseInt(diurnal) || 0) +
      (parseInt(nocturnal) || 0) +
      (parseInt(diurnalHollyday) || 0) +
      (parseInt(nocturnalHollyday) || 0);
    setExtraHours((prevData) => ({
      ...prevData,
      extrasHours: sumExtraHours,
    }));
  }, [
    extraHours.diurnal,
    extraHours.nocturnal,
    extraHours.diurnalHollyday,
    extraHours.nocturnalHollyday,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { registry, ...body } = extraHours;

      if (!registry) {
        throw new Error("No se ha proporcionado un registro para actualizar");
      }

      const response = await fetch(`/extrahours/$(registry)`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar los datos");
      }

      const data = await response.json();
      console.log("Datos actualizados correctamente:", data);

      // console.log("Enviando datos", body);

      setExtraHours({
        registry: "",
        id: "",
        date: "",
        extraHours: {
          diurnal: "",
          nocturnal: "",
          diurnalHollyday: "",
          nocturnalHollyday: "",
          extrasHours: 0,
        },
        observations: "",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
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
        />
        <label>Nocturna</label>
        <input
          type="number"
          name="nocturnal"
          value={extraHours.nocturnal}
          onChange={handleChange}
        />
        <label>Diurna Festiva</label>
        <input
          type="number"
          name="diurnalHollyday"
          value={extraHours.diurnalHollyday}
          onChange={handleChange}
        />
        <label>Nocturna festiva</label>
        <input
          type="number"
          name="nocturnalHollyday"
          value={extraHours.nocturnalHollyday}
          onChange={handleChange}
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
        {loading ? "Actualizando..." : "Actualizar"}
      </button>
    </form>
  );
};
