import React from "react";
import "./ReportsPage.scss";
import { ReportInfo } from "../components/ReportInfo/ReportInfo";
import logo from "../../../server/public/images/logo.png";

const Reports = () => {
  return (
    <>
      <header className="page__header">
        <a href="http://localhost:5173/">
          <img src={logo} />
          {/* <h1 class="heading">Horas Extra Amadeus</h1> */}
        </a>
      </header>
      <h2>Informes</h2>
      <ReportInfo />
    </>
  );
};

export default Reports;
