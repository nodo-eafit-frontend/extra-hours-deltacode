import { Input } from "antd";
import { useState } from "react";
import "./ExtraHoursInfo.scss";
const { Search } = Input;
import { findExtraHour } from "@services/findExtraHour";

export const ExtraHoursInfo = ({ onIdChange }) => {
  const [extraHours, setExtraHour] = useState({});
  const [notFound, setNotFound] = useState();

  const onSearch = async (extraHourRegistry) => {
    try {
      const data = await findExtraHour(extraHourRegistry);

      console.log("Datos obtenidos:", data);

      setExtraHour(data);
      setNotFound(false);
      onIdChange(extraHourRegistry);
    } catch (error) {
      console.error(error);
      setNotFound(true);
      setExtraHour({});
    }
  };

  const details = [
    { title: "Registro", key: "registry" },
    { title: "Fecha", key: "date" },
    { title: "Diurna", key: "diurnal" },
    { title: "Nocturna", key: "nocturnal" },
    { title: "Diurna festiva", key: "diurnalHoliday" },
    { title: "Nocturna festiva", key: "nocturnalHoliday" },
    { title: "Horas extra totales", key: "extraHours" },
    { title: "Observaciones", key: "observations" },
  ];

  return (
    <div className="Info">
      <div className="search-container">
        <Search placeholder="Registro" onSearch={onSearch} />
        {notFound && <span>Registro no encontrado, intente con otro</span>}
      </div>

      {extraHours && Object.keys(extraHours).length > 0 && (
        <div className="detailsInfo">
          {details.map((item) => (
            <div className="description-item" key={item.key}>
              <div className="title">{item.title}</div>
              <div className="description">{extraHours[item.key]}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
