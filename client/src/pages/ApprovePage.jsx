import React from "react";
import "./ApprovePage.scss";
import { Approve } from "../components/Approve/Approve";
import logo from "../../../server/public/images/logo.png";
const ApproveExtrahour = () => {
  return (
    <>
      <header className="page__header">
        <a href="http://localhost:5173/">
          <img src={logo} />
          {/* <h1 class="heading">Horas Extra Amadeus</h1> */}
        </a>
      </header>

      <h2>Aprobar - Eliminar horas extra</h2>
      <Approve />
    </>
  );
};

export default ApproveExtrahour;
