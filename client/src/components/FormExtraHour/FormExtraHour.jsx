import React, { useState, useEffect } from "react";
import "./FormExtraHour.scss";

export const FormExtraHour = () => {
  const [formData, setFormData] = useState({
    fecha: "",
    diurna: "",
    diurnaFestiva: "",
    nocturna: "",
    nocturnaFestiva: "",
    horasExtra: 0,
    observaciones: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const { diurna, diurnaFestiva, nocturna, nocturnaFestiva } = formData;
    const sumaHorasExtra =
      (parseInt(diurna) || 0) +
      (parseInt(diurnaFestiva) || 0) +
      (parseInt(nocturna) || 0) +
      (parseInt(nocturnaFestiva) || 0);

    setFormData((prevData) => ({
      ...prevData,
      horasExtra: sumaHorasExtra,
    }));
  }, [
    formData.diurna,
    formData.diurnaFestiva,
    formData.nocturna,
    formData.nocturnaFestiva,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    //Agregar lógica para manejar el envío del formulario
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fecha"></label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
        />
      </div>
      <div className="form-group-horizontal">
        <label>Diurna</label>
        <input
          type="number"
          name="diurna"
          value={formData.diurna}
          onChange={handleChange}
        />
        <label>Diurna festiva</label>
        <input
          type="number"
          name="diurnaFestiva"
          value={formData.diurnaFestiva}
          onChange={handleChange}
        />
        <label>Nocturna</label>
        <input
          type="number"
          name="nocturna"
          value={formData.nocturna}
          onChange={handleChange}
        />
        <label>Nocturna festiva</label>
        <input
          type="number"
          name="nocturnaFestiva"
          value={formData.nocturnaFestiva}
          onChange={handleChange}
        />
        <label>Horas extra</label>
        <input
          type="number"
          name="horasExtra"
          value={formData.horasExtra}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="observaciones">Observaciones</label>
        <textarea
          id="observaciones"
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Agregar</button>
    </form>
  );
};
