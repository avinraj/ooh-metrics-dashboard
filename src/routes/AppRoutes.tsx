// AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Home from "../app/Home/Home";
import Signup from "../app/Signup/Signup";
import HighLight from "../app/Highlight/HighLight";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../layout/Layout";
import Impressions from "../app/Impressions/pages/Impressions";
import AdPage from "../app/Adtype/AdPage";
import Cars from "../app/Cars/pages/Cars";
import MapView from "../app/MapView/pages/MapView";

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
      <Route
        path="/AdType"
        element={
          <ProtectedRoute>
            <Layout>
              <AdPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/cars"
        element={
          <ProtectedRoute>
            <Layout>
              <Cars />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/map-view"
        element={
          <ProtectedRoute>
            <Layout>
              <MapView />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
