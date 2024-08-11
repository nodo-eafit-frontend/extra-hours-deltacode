import { Input, Space } from 'antd';
import { useState } from 'react';
const { Search } = Input;
import { Description } from '@components';
import { findEmployee } from '@services/findEmployee';

export const EmployeeInfo = () => {
	const [employee, setEmployee] = useState({});
	const [notFound, setNotFound] = useState();

	const onSearch = async (employeeId) => {
		try {
			const data = await findEmployee(employeeId);

			setEmployee(data);
			setNotFound(false);
		} catch (error) {
			console.error(error);
			setNotFound(true);
			setEmployee({});
		}
	};

	return (
		<>
			<Search placeholder="Cédula" onSearch={onSearch} />
			{notFound && <span>Empleado no encontrado, intente con otra cédula</span>}
			{!!Object.keys(employee).length && (
				<>
					<Description title={'Empleado'} description={employee.name} />
					<Description title={'Salario'} description={employee.salary} />
					<Description title={'Cargo'} description={employee.position} />
					<Description title={'Supervisor'} description={employee.supervisor} />
				</>
			)}
		</>
	);
};
