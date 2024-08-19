import React from "react";
import "./DeleteExtrahour.scss";
import { DeleteForm } from "../components/DeleteForm/DeleteForm";

const DeleteExtrahour = () => {
  return (
    <>
      <header class="page__header">
        <a href="http://localhost:5173/">
          <img src="http://localhost:4000/images/logo.png" alt="Logo" />
          <h1 class="heading">Horas Extra Amadeus</h1>
        </a>
      </header>
      <body>
        <h2>Eliminar horas extra</h2>
        <DeleteForm />
      </body>
    </>
  );
};

export default DeleteExtrahour;
