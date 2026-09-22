import { Routes, Route, Navigate } from "react-router-dom";
import EmployeeListPage from "./pages/EmployeeListPage";
import AddEmployeePage from "./pages/AddEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/employees" replace />} />
      <Route path="/employees" element={<EmployeeListPage />} />
      <Route path="/employees/add" element={<AddEmployeePage />} />
      <Route path="/employees/:id/edit" element={<EditEmployeePage />} />
      <Route path="*" element={<Navigate to="/employees" replace />} />
    </Routes>
  );
}
