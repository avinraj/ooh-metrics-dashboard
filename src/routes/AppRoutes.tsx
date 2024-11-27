// AppRoutes.tsx
import { Route, Routes } from "react-router-dom";
import HighLight from "../app/Highlight/HighLight";
// import Home from "../app/Home/Home";
import Reports from "../app/Reports/pages/Reports";
import Signup from "../app/Signup/Signup";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "../layout/Layout";
import AdPage from "../app/Adtype/AdPage";
import Cars from "../app/Cars/pages/Cars";
import MapView from "../app/MapView/pages/MapView";
import Attribution from "../app/Attribution/pages/Attribution";
import Audience from "../app/Reports/pages/Audience";
import MobileAdReports from "../app/Reports/pages/MobileAdReports";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      {/* <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      /> */}
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
