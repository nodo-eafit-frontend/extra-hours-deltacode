require("dotenv").config();
const { readJsonFile, updateJsonFile } = require("../utils/json-reader");

// Función para obtener las horas extra
const getExtrahours = async (request, response) => {
  try {
    const data = await readJsonFile(process.env.JSON_DIR_EXTRAHOUR);
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ message: "Error al obtener las horas extra" });
  }
};

// Función para actualizar una hora extra existente
const putExtrahours = async (request, response) => {
  const { id } = request.params;
  const updateExtraHour = request.body;

  try {
    const data = await readJsonFile(process.env.JSON_DIR_EXTRAHOUR);
    const index = data.findIndex((item) => item.id === id);

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
  const { id } = request.params;

  try {
    const data = await readJsonFile(process.env.JSON_DIR_EXTRAHOUR);
    const filteredData = data.filter((item) => item.id != id);

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
    const data = await readJsonFile(process.env.JSON_DIR_EXTRAHOUR);

    // Asignar un nuevo ID basado en el ID más alto existente
    const newId =
      data.length > 0 ? Math.max(...data.map((item) => item.id || 0)) + 1 : 1;
    const newExtraHour = { id: newId, ...body };

    // Agregar el nuevo registro al arreglo
    data.push(newExtraHour);

    // Actualizar el archivo JSON con la nueva hora extra
    await updateJsonFile(process.env.JSON_DIR_EXTRAHOUR, data);

    // Enviar la respuesta con el nuevo registro
    response.status(201).json(newExtraHour);
  } catch (error) {
    console.error("Error al procesar la solicitud POST:", error.message);
    response
      .status(500)
      .json({ message: "Error al agregar la nueva hora extra" });
  }
};

module.exports = {
  getExtrahours,
  putExtrahours,
  deleteExtrahours,
  postExtrahours,
};
