import React from "react";
import "./PayExtraHoursPage.scss";
import { PayExtraHours } from "../components/PayExtraHours/PayExtraHours";
import logo from "../../../server/public/images/logo.png";

const PayExtraHoursPage = () => {
  return (
    <>
      <header className="page__header">
        <a href="http://localhost:5173/">
          <img src={logo} />
          {/* <h1 class="heading">Horas Extra Amadeus</h1> */}
        </a>
      </header>

      <h2>Pagar horas extra</h2>
      <PayExtraHours />
    </>
  );
};

export default PayExtraHoursPage;
