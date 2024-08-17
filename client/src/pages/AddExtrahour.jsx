import React from "react";
import "./AddExtrahour.scss";
import { EmployeeInfo } from "@components";
import { FormExtraHour } from "../components/FormExtraHour/FormExtraHour";

const AddExtrahour = () => {
  return (
    <>
      <h2>Agregar horas extra</h2>
      {/* <EmployeeInfo /> */}
      <FormExtraHour />
    </>
  );
};

export default AddExtrahour;
