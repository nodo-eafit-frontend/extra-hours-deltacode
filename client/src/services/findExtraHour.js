export const findExtraHour = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/extra-hour/${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
