require("dotenv").config();
const { readJsonFile } = require("../utils/json-reader");

const getRegistryWithId = async (request, response) => {
  const id = Number(request.params.id);
  try {
    let extraHoursJSON = [];
    extraHoursJSON = await readJsonFile(process.env.JSON_DIR_EXTRAHOUR);

    const extrahoursFound = extraHoursJSON.find((extrahoursFound) => {
      return extrahoursFound.id === id;
    });

    if (!extrahoursFound) {
      throw new Error("Id not Found");
    }

    response.status(200).send(extrahoursFound);
  } catch (error) {
    console.log(error);

    response.sendStatus(400);
  }
};

module.exports = {
  getRegistryWithId,
};
