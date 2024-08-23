import "./App.scss";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExtraHoursMenu from "./components/ExtraHoursMenu";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import ApprovePage from "./pages/ApprovePage";
import AddExtrahour from "./pages/AddExtrahour";
import PayExtraHoursPage from "./pages/PayExtraHoursPage";
import DeleteExtrahour from "./pages/DeleteExtrahour";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExtraHoursMenu />} />
        <Route path="/add" element={<AddExtrahour />} />
        <Route path="/update" element={<PayExtraHoursPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/delete" element={<DeleteExtrahour />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/approve-payroll" element={<ApprovePage />} />
      </Routes>
    </Router>
  );
}

export default App;
