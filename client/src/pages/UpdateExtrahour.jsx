import React from "react";
import "./UpdateExtrahour.scss";
import { UpdateTable } from "../components/UpdateTable/UpdateTable";

const UpdateExtrahour = () => {
  return (
    <>
      <header className="page__header">
        <a href="http://localhost:5173/">
          <img src="http://localhost:4000/images/logo.png" alt="Logo" />
          {/* <h1 class="heading">Horas Extra Amadeus</h1> */}
        </a>
      </header>

      <h2>Actualizar horas extra</h2>
      <UpdateTable />
    </>
  );
};

export default UpdateExtrahour;
