import React from "react";
import { useNavigate } from "react-router-dom";
import "./ExtraHoursMenu.scss";
import Actualizar from "../assets/images/Actualizar.png";
import Agregar from "../assets/images/Agregar.png";
import Configuracion from "../assets/images/Configuracion.png";
import Eliminar from "../assets/images/Eliminar.png";
import Informes from "../assets/images/Informes.png";
import NominaAprobar from "../assets/images/NominaAprobar.png";
import background from "../assets/images/background.png";

const ExtraHoursMenu = () => {
  const navigate = useNavigate();

  return (
<<<<<<< HEAD
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="menu">
        <h1>Horas extra Amadeus</h1>
        <div className="grid">
          <div className="menu-item" onClick={() => navigate("/add")}>
            <div id="imgagregar">
              <img src={Agregar} alt="Agregar" />
            </div>
            <p>Agregar</p>
          </div>
          <div className="menu-item" onClick={() => navigate("/update")}>
            <img src={Actualizar} alt="Actualizar" />
            <p>Actualizar</p>
          </div>
          <div className="menu-item" onClick={() => navigate("/reports")}>
            <img src={Informes} alt="Informes" />
            <p>Informes</p>
          </div>
          <div className="menu-item" onClick={() => navigate("/delete")}>
            <img src={Eliminar} alt="Eliminar" />
            <p>Eliminar</p>
          </div>
          <div className="menu-item" onClick={() => navigate("/settings")}>
            <img src={Configuracion} alt="Configuración" />
            <p>Configuración</p>
          </div>
          <div
            className="menu-item"
            onClick={() => navigate("/approve-payroll")}
          >
            <img src={NominaAprobar} alt="Nómina - Aprobar" />
            <p>Nómina - Aprobar</p>
          </div>
=======
    <div className="menu">
      <h1>Horas extra Amadeus</h1>
      <div className="grid">
        <div className="menu-item" onClick={() => navigate("/add")}>
          <div id="imgagregar">
            <img src={Agregar} alt="Agregar" />
          </div>
          <p>Agregar</p>
        </div>
        <div className="menu-item" onClick={() => navigate("/update")}>
          <img src={Actualizar} alt="Actualizar" />
          <p>Actualizar</p>
        </div>
        <div className="menu-item" onClick={() => navigate("/reports")}>
          <img src={Informes} alt="Informes" />
          <p>Informes</p>
        </div>
        <div className="menu-item" onClick={() => navigate("/delete")}>
          <img src={Eliminar} alt="Eliminar" />
          <p>Eliminar</p>
        </div>
        <div className="menu-item" onClick={() => navigate("/settings")}>
          <img src={Configuracion} alt="Configuración" />
          <p>Configuración</p>
        </div>
        <div className="menu-item" onClick={() => navigate("/approve-payroll")}>
          <img src={NominaAprobar} alt="Nómina - Aprobar" />
          <p>Nómina - Aprobar</p>
>>>>>>> 67f6b99f30101f6589ec60c8dc7260218539d1dd
        </div>
      </div>
    </div>
  );
};

export default ExtraHoursMenu;
