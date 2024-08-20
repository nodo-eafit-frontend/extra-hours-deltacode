export const findEmployeeWithExtraHours = async (employeeId) => {
  const response = await fetch(
    `http://localhost:4000/employee-info/${employeeId}/extra-hours`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
};
