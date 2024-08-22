import React from "react";
import { UpdateAndDelete } from "../components/UpdateAndDelete/UpdateAndDelete";
import "./DeleteExtrahour.scss";
import background from "../assets/images/background.png";

const DeleteExtrahour = () => {
  return (
    <>
     <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '100vh',
        }}
      >
      <header className="page__header">
        <a href="http://localhost:5173/">
          <img src="http://localhost:4000/images/logo.png" alt="Logo" />
          {/* <h1 class="heading">Horas Extra Amadeus</h1> */}
        </a>
      </header>
      <h2>Eliminar horas extra</h2>
      <UpdateAndDelete />
      </div>
    </>
  );
};

export default DeleteExtrahour;
