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
import QuestionManagement from '@pages/quan-ly-cau-hoi';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path={endPoints.ALL} element={<AdminLayout />}>
            <Route path={endPoints.DASHBOARD} element={<Dashboard />} />
            <Route
              path={endPoints.QUANLYDUAN}
              element={<ProjectManagement />}
            />
            <Route path={endPoints.QUANLYINTERN}>
              <Route
                path={endPoints.DANHSACHINTERN}
                element={<InternManagement />}
              />
              <Route path={endPoints.KYTHUCTAP} element={<InternPeriod />} />
          

            </Route>
            <Route path={endPoints.QUANLYCAUHOI} element={<QuestionManagement />} />
            <Route
              path={endPoints.QUANLYVITRI}
              element={<PositionManagement />}
            />
            <Route
              path={endPoints.QUANLYCONGVIEC}
              element={<JobManagement />}
            />
            <Route
              path={endPoints.QUANLYNGUOIDUNG}
              element={<UserManagement />}
            />
          </Route>
        </Route>
        <Route path={endPoints.LOGIN} element={<Login />} />
        <Route path={endPoints.REGISTER} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
