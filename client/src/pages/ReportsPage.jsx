import React from "react";
import ExtraHoursTable from "../components/ExtraHoursTable/ExtraHoursTable";
import "./ReportsPage.scss";

const Reports = () => {
  return (
    <>
      <header class="page__header">
        <a href="http://localhost:5173/">
          <img src="http://localhost:4000/images/logo.png" alt="Logo" />
          <h1 class="heading">Horas Extra Amadeus</h1>
        </a>
      </header>
      <body>
        <h2>Informes</h2>
        <ExtraHoursTable />
      </body>
    </>
  );
};

export default Reports;
