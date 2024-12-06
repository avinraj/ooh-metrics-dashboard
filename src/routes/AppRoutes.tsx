// AppRoutes.tsx
import { Route, Routes } from "react-router-dom";
import HighLight from "../app/Highlight/HighLight";
import Reports from "../app/Reports/pages/Reports";
import Signup from "../app/Signup/Signup";

import AdPage from "../app/Adtype/AdPage";
import Attribution from "../app/Attribution/pages/Attribution";
import Vehicles from "../app/Cars/pages/Vehicles";
import MapView from "../app/MapView/pages/MapView";
import Layout from "../layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Audience from "../app/Reports/pages/Audience";
import MobileAdReports from "../app/Reports/pages/MobileAdReports";
import "../App.css";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
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
      <Route
        path="/mobile-ad-reports"
        element={
          <ProtectedRoute>
            <Layout>
              <MobileAdReports />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/audience"
        element={
          <ProtectedRoute>
            <Layout>
              <Audience />
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
        path="/vehicles"
        element={
          <ProtectedRoute>
            <Layout>
              <Vehicles />
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
      <Route
        path="/attribution"
        element={
          <ProtectedRoute>
            <Layout>
              <Attribution />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
