export const deleteExtraHour = async (registry) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `http://localhost:4000/extra-hour/${registry}`,
      options
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar las horas extra");
    }

    return response.json();
  } catch (error) {
    console.error("Error al eliminar las horas extra:", error);
    throw error;
  }
};
