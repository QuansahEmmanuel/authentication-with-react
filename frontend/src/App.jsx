import { Routes, Route, Navigate } from "react-router";
import { useAuthStore } from "./lib/authStore";

import Dashboard from "./pages/Dashboard"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import NoteFound from "./pages/NoteFound"
import Navbar from "./components/Navbar"

import { useEffect } from "react";





const App = () => {

  const { checkAuth, isAuthenticated, loading } = useAuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
        />

        <Route path="*" element={<NoteFound />} />
      </Routes>
    </div>
  );
};
export default App 