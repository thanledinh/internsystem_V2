import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLayout from "./layouts/AdminLayout";
import endPoints from "./routers/router";
import Dashboard from "@pages/dashboard";
import ProjectManagement from "@pages/quan-ly-du-an";
import InternManagement from "@pages/quan-ly-intern/danh-sach-intern";
import InternPeriod from "@pages/quan-ly-intern/ky-thuc-tap";
import PositionManagement from "@pages/quan-ly-vi-tri";
import JobManagement from "@pages/quan-ly-cong-viec";
import UserManagement from "@pages/quan-ly-nguoi-dung";
import Login from "@pages/login";
import Register from "@pages/register";
import PrivateRoute from "@components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path={endPoints.ALL} element={<AdminLayout />}>
            <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
              <Route path={endPoints.DASHBOARD} element={<Dashboard />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={["Admin", "Mentor"]} />}>
              <Route path={endPoints.QUANLYDUAN} element={<ProjectManagement />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={["Admin", "Hr"]} />}>
              <Route path={endPoints.QUANLYINTERN}>
                <Route path={endPoints.DANHSACHINTERN} element={<InternManagement />} />
                <Route path={endPoints.KYTHUCTAP} element={<InternPeriod />} />
              </Route>
            </Route>
            <Route element={<PrivateRoute allowedRoles={["Admin", "Hr"]} />}>
              <Route path={endPoints.QUANLYVITRI} element={<PositionManagement />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={["Admin", "Hr", "Mentor", "Intern"]} />}>
              <Route path={endPoints.QUANLYCONGVIEC} element={<JobManagement />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
              <Route path={endPoints.QUANLYNGUOIDUNG} element={<UserManagement />} />
            </Route>
          </Route>
        </Route>
        <Route path={endPoints.LOGIN} element={<Login />} />
        <Route path={endPoints.REGISTER} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
