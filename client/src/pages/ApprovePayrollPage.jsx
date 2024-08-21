import React from "react";
import "./ApprovePayrollPage.scss";
import { ExtraHoursInfo } from "../components/ExtraHoursInfo/ExtraHoursInfo";

const ApproveExtrahour = () => {
  return (
    <>
      <header className="page__header">
        <a href="http://localhost:5173/">
          <img src="http://localhost:4000/images/logo.png" alt="Logo" />
          {/* <h1 class="heading">Horas Extra Amadeus</h1> */}
        </a>
      </header>

      <h1>Aprobar horas extra</h1>
      {/* <ExtraHoursInfo /> */}
    </>
  );
};

export default ApproveExtrahour;
