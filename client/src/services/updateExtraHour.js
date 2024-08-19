export const updateExtraHour = async (body) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    // console.log("Enviando datos:", body);

    const response = await fetch(
      `http://localhost:4000/extra-hour/${body.registry}`,
      options
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
