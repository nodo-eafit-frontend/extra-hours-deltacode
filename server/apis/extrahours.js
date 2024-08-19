require("dotenv").config();
const { readJsonFile, updateJsonFile } = require("../utils/json-reader");

// Función para obtener las horas extra
const getExtrahours = async (request, response) => {
  try {
    const data = await readJsonFile(process.env.JSON_DIR_EXTRAHOUR);
    response.status(200).send(data);
  } catch (error) {
    response.status(500).json({ message: "Error al obtener las horas extra" });
  }
};

// Función para actualizar una hora extra existente
const putExtrahours = async (request, response) => {
  const { registry } = request.params;
  const updateExtraHour = request.body;

  try {
    const data = await readJsonFile(process.env.JSON_DIR_EXTRAHOUR);
    const index = data.findIndex((item) => item.registry === registry);

    if (index !== -1) {
      data[index] = { ...data[index], ...updateExtraHour };
      await updateJsonFile(process.env.JSON_DIR_EXTRAHOUR, data);
      response.status(200).json(data[index]);
    } else {
      response.status(404).json({ message: "Hora extra no encontrada" });
    }
  } catch (error) {
    response.status(500).json({ message: "Error al actualizar la hora extra" });
  }
};

//Función para eliminar una hora extra
const deleteExtrahours = async (request, response) => {
  const { registry } = request.params;

  try {
    const data = await readJsonFile(process.env.JSON_DIR_EXTRAHOUR);
    const filteredData = data.filter((item) => item.registry != registry);

    if (data.length !== filteredData.length) {
      await updateJsonFile(process.env.JSON_DIR_EXTRAHOUR, filteredData);
      response
        .status(200)
        .json({ message: "Hora extra eliminada exitosamente" });
    } else {
      response.status(404).json({ message: "Hora extra no encontrada" });
    }
  } catch (error) {
    response.status(500).json({ message: "Error al eliminar la hora extra" });
  }
};

// Función para agregar una nueva hora extra
const postExtrahours = async (request, response) => {
  try {
    const { body } = request;

    console.log("datos recibidos:", body);

    // if (!body.id || !body.date || !body.extraHours) {
    //   return response
    //     .status(400)
    //     .json({ message: "Campos requeridos faltantes" });
    // }

    const data = await readJsonFile(process.env.JSON_DIR_EXTRAHOUR);

    await updateJsonFile(process.env.JSON_DIR_EXTRAHOUR, data);
    data.push(body);
    await updateJsonFile(process.env.JSON_DIR_EXTRAHOUR, data);

    response
      .status(201)
      .json({ message: "Horas extras agregadas correctamente" });
  } catch (error) {
    console.error(error);

    response
      .status(500)
      .json({ message: "Error interno del seervidor", details: error.message });
  }
};

module.exports = {
  getExtrahours,
  putExtrahours,
  deleteExtrahours,
  postExtrahours,
};
