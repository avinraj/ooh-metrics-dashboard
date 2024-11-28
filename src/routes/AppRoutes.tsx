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
import Buses from "../app/Cars/pages/Buses";
import Trucks from "../app/Cars/pages/Trucks";
import Escooters from "../app/Cars/pages/Escooters";
import TwoWheerlers from "../app/Cars/pages/TwoWheelers";

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
        path="/buses"
        element={
          <ProtectedRoute>
            <Layout>
              <Buses />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/trucks"
        element={
          <ProtectedRoute>
            <Layout>
              <Trucks />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/escooters"
        element={
          <ProtectedRoute>
            <Layout>
              <Escooters />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/twowheelers"
        element={
          <ProtectedRoute>
            <Layout>
              <TwoWheerlers />
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
