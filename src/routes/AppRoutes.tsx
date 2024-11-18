// AppRoutes.tsx
import { Route, Routes } from "react-router-dom";
import HighLight from "../app/Highlight/HighLight";
import Home from "../app/Home/Home";
import Reports from "../app/Reports/pages/Reports";
import Signup from "../app/Signup/Signup";
import Layout from "../layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/highlight"
        element={
          <ProtectedRoute>
            <Layout>
              <HighLight />
            </Layout>
          </ProtectedRoute>
        }
      />
       <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Layout>
              <Reports />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
