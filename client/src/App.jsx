import './App.scss';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ApprovePayrollPage from './pages/ApprovePayrollPage';
import AddExtrahour from './pages/AddExtrahour';
import UpdateExtrahour from './pages/UpdateExtrahour';
import DeleteExtrahour from './pages/DeleteExtrahour';
function App() {
	
	return (
		<Router>
		<Routes>
		  <Route path="/" element={<Menu />} />
		  <Route path="/add" element={<AddExtrahour />} />
		  <Route path="/update" element={<UpdateExtrahour />} />
		  <Route path="/reports" element={<ReportsPage />} />
		  <Route path="/delete" element={<DeleteExtrahour />} />
		  <Route path="/settings" element={<SettingsPage />} />
		  <Route path="/approve-payroll" element={<ApprovePayrollPage />} />
		</Routes>
	  </Router>
	);
  };

export default App;
