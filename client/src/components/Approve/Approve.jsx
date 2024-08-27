import React, { useState } from "react";
import { Input, Table, Button, Modal, message } from "antd";
import { findEmployee } from "@services/findEmployee";
import { findExtraHour } from "@services/findExtraHour";
import { postExtraHourToJSON } from "@services/postExtraHourToJSON";
import { deleteExtraHour } from "../../services/deleteExtraHour";
import "./Approve.scss";

export const Approve = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (idOrRegistry) => {
    const numericIdOrRegistry = parseInt(idOrRegistry, 10);
    setLoading(true);
    setError(null);

    try {
      const employee = await findEmployee(numericIdOrRegistry);
      const extraHours = await findExtraHour(numericIdOrRegistry, "id");

      if (!extraHours.length) {
        const extraHourByRegistry = await findExtraHour(
          numericIdOrRegistry,
          "registry"
        );
        setEmployeeData(
          extraHourByRegistry.map((extraHour) => ({
            ...extraHour,
            ...employee,
          }))
        );
      } else {
        setEmployeeData(
          extraHours.map((extraHour) => ({ ...extraHour, ...employee }))
        );
      }
    } catch (error) {
      setError("No se encontraron datos para el ID ingresado.");
      setEmployeeData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (record) => {
    try {
      const updatedRecord = {
        ...record,
        salary: Number(record.salary),
        diurnal: Number(record.diurnal),
        nocturnal: Number(record.nocturnal),
        diurnalHoliday: Number(record.diurnalHoliday),
        nocturnalHoliday: Number(record.nocturnalHoliday),
        extrasHours: Number(record.extrasHours),
      };

      const response = await postExtraHourToJSON(updatedRecord);

      console.log("Respuesta de la API:", response);

      message.success("Registro aprobado exitosamente");
    } catch (error) {
      message.error("Error al aprobar el registro");
    }
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "¿Estás seguro que deseas eliminar este registro?",
      onOk: async () => {
        try {
          await deleteExtraHour(record.registry);

          setEmployeeData((prevData) =>
            prevData.filter((item) => item.registry !== record.registry)
          );

          message.success("Registro eliminado exitosamente");
        } catch (error) {
          message.error("Error al eliminar el registro");
        }
      },
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Empleado",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Salario",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Cargo",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Supervisor",
      dataIndex: "supervisor",
      key: "supervisor",
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Diurnas",
      dataIndex: "diurnal",
      key: "diurnal",
    },
    {
      title: "Nocturnas",
      dataIndex: "nocturnal",
      key: "nocturnal",
    },
    {
      title: "Diurnas Festivas",
      dataIndex: "diurnalHoliday",
      key: "diurnalHoliday",
    },
    {
      title: "Nocturnas Festivas",
      dataIndex: "nocturnalHoliday",
      key: "nocturnalHoliday",
    },
    {
      title: "Total Horas Extras",
      dataIndex: "extrasHours",
      key: "extrasHours",
    },
    {
      title: "Observaciones",
      dataIndex: "observations",
      key: "observations",
    },
    {
      title: "Registro",
      dataIndex: "registry",
      key: "registry",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button
            type="link"
            onClick={() => handleApprove(record)}
            style={{ marginRight: 8 }}
          >
            Aprobar
          </Button>
          <Button type="link" onClick={() => handleDelete(record)}>
            Eliminar
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div className="Approve">
      <div className="search-container">
        <Input.Search
          placeholder="Ingrese ID del empleado"
          onSearch={handleSearch}
        />
        {error && <p className="error-message">{error}</p>}
      </div>

      {loading && <p>Cargando datos...</p>}

      {employeeData.length > 0 && (
        <div className="extra-hours-info">
          <h3>Registros de Horas Extras</h3>
          <Table
            columns={columns}
            dataSource={employeeData}
            rowKey="registry"
            pagination={false}
            scroll={{
              x: 900,
              y: 500,
            }}
          />
        </div>
      )}
    </div>
  );
};
