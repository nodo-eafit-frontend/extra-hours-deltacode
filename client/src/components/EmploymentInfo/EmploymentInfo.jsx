import { Input, Space } from 'antd';
import { useState } from 'react';
const { Search } = Input;

import { Description } from '../Description/Description';

export const EmploymentInfo = () => {
	const [employee, setEmployee] = useState({});

	const onSearch = async (value) => {
		console.log(value);

		const response = await fetch(`http://localhost:4000/employee-info/${value}`);
		const data = await response.json();

		console.log(data);
		setEmployee(data);
	};

	return (
		<>
			<Search placeholder="Cédula" onSearch={onSearch} />
			<Description title={'Empleado'} description={employee.name} />
			<Description title={'Salario'} description={employee.salary} />
		</>
	);
};
