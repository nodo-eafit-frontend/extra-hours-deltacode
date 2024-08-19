import React from "react";
import "./AddExtrahour.scss";
import { FormExtraHour } from "../components/FormExtraHour/FormExtraHour";

const AddExtrahour = () => {
  return (
    <>
      <header class="page__header">
        <a href="http://localhost:5173/">
          <img src="http://localhost:4000/images/logo.png" alt="Logo" />
          {/* <h1 class="heading">Horas Extra Amadeus</h1> */}
        </a>
      </header>
      <body>
        <h2>Agregar horas extra</h2>

        <FormExtraHour class="Form" />
      </body>
    </>
  );
};

export default AddExtrahour;
