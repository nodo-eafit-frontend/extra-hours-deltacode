import React from "react";
import "./UpdateExtrahour.scss";
import { EmployeeInfo } from "@components";
// import { TableExtraHours } from "@components";
import { FormUpdate } from "@components";

const UpdateExtrahour = () => {
  return (
    <>
      <h2>Actualizar horas extra</h2>
      <EmployeeInfo />
      {/* <TableExtraHours /> */}
      <FormUpdate />
    </>
  );
};

export default UpdateExtrahour;
