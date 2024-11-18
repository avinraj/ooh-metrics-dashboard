// AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Home from "../app/Home/Home";
import Signup from "../app/Signup/Signup";
import HighLight from "../app/Highlight/HighLight";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../layout/Layout";
import Impressions from "../app/Impressions/pages/Impressions";

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
        path="/impressions"
        element={
          <ProtectedRoute>
            <Layout>
              <Impressions />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
