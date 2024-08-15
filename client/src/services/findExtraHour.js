export const findExtraHour = async (registry) => {
  try {
    const response = await fetch(
      `http://localhost:4000/extra-hour/${registry}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
