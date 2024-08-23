import React from "react";
import "./PayExtraHoursPage.scss";
import { PayExtraHours } from "../components/PayExtraHours/PayExtraHours";

const PayExtraHoursPage = () => {
  return (
    <>
      <header className="page__header">
        <a href="http://localhost:5173/">
          <img src="http://localhost:4000/images/logo.png" alt="Logo" />
          {/* <h1 class="heading">Horas Extra Amadeus</h1> */}
        </a>
      </header>

      <h2>Pagar horas extra</h2>
      <PayExtraHours />
    </>
  );
};

export default PayExtraHoursPage;
