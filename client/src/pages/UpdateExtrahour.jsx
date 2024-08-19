import React from "react";
import "./UpdateExtrahour.scss";
import { UpdateForm } from "../components/UpdateForm/UpdateForm";

const UpdateExtrahour = () => {
  return (
    <>
      <header class="page__header">
        <a href="http://localhost:5173/">
          <img src="http://localhost:4000/images/logo.png" alt="Logo" />
          <h1 class="heading">Horas Extra Amadeus</h1>
        </a>
      </header>
      <body>
        <h2>Actualizar horas extra</h2>
        <UpdateForm />
      </body>
    </>
  );
};

export default UpdateExtrahour;
