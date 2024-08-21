import React from "react";
import "./ReportsPage.scss";
import { ReportInfo } from "../components/ReportInfo/ReportInfo";

const Reports = () => {
  return (
    <>
      <header className="page__header">
        <a href="http://localhost:5173/">
          <img src="http://localhost:4000/images/logo.png" alt="Logo" />
          {/* <h1 class="heading">Horas Extra Amadeus</h1> */}
        </a>
      </header>
      <h2>Informes</h2>
      <ReportInfo />
    </>
  );
};

export default Reports;
