import { Input } from "antd";
import { useState } from "react";
import "./ExtraHoursInfo.scss";
const { Search } = Input;
import { findExtraHour } from "@services/findExtraHour";

export const ExtraHoursInfo = ({ onIdChange }) => {
  const [extraHour, setExtraHour] = useState({});
  const [notFound, setNotFound] = useState();

  const onSearch = async (extraHourRegistry) => {
    console.log("onSearch called with extraHourRegistry:", extraHourRegistry);

    try {
      const data = await findExtraHour(extraHourRegistry);

      setExtraHour(data);
      setNotFound(false);
      console.log(
        "Calling onIdChange with extraHourRegistry:",
        extraHourRegistry
      );
      onIdChange(extraHourRegistry);
    } catch (error) {
      console.error(error);
      setNotFound(true);
      setExtraHour({});
    }
  };

  return (
    <div className="Info">
      <div className="search-container">
        <Search placeholder="Registry" onSearch={onSearch} />
        {notFound && (
          <span>Registro no encontrado, intente con otra registro</span>
        )}
      </div>

      {!!Object.keys(extraHour).length && (
        <div className="detailsInfo">
          <div className="description-item">
            <div className="title">Registry</div>
            <div className="description">{extraHour.registry}</div>
          </div>
          <div className="description-item">
            <div className="title">ID</div>
            <div className="description">{extraHour.id}</div>
          </div>
          <div className="description-item">
            <div className="title">Date</div>
            <div className="description">{extraHour.date}</div>
          </div>
          <div className="description-item">
            <div className="title">Diurnal</div>
            <div className="description">{extraHour.diurnal}</div>
          </div>
          <div className="description-item">
            <div className="title">Nocturnal</div>
            <div className="description">{extraHour.nocturnal}</div>
          </div>
          <div className="description-item">
            <div className="title">DiurnalHoliday</div>
            <div className="description">{extraHour.diurnalHoliday}</div>
          </div>
          <div className="description-item">
            <div className="title">NocturnalHoliday</div>
            <div className="description">{extraHour.nocturnalHoliday}</div>
          </div>
          <div className="description-item">
            <div className="title">ExtraHours</div>
            <div className="description">{extraHour.extraHours}</div>
          </div>
          <div className="description-item">
            <div className="title">Observations</div>
            <div className="description">{extraHour.observations}</div>
          </div>
        </div>
      )}
    </div>
  );
};
